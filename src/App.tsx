import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { runSeedScript } from "./SeedDatabase";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();

  const [farmCustomers, setFarmCustomers] = useState<Array<Schema["FarmCustomer"]["type"]>>([]);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    try {
      subscription = client.models.FarmCustomer.observeQuery().subscribe({
        next: (data) => {
          setFarmCustomers([...data.items]);
          setError(null);
          setIsConnected(true);
          setIsLoading(false);
        },
        error: (err: Error) => {
          console.error("Error fetching farm customers:", err);
          setError(`Connection failed: ${err.message}`);
          setIsConnected(false);
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("Error setting up subscription:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unable to initialize connection';
      setError(`Setup failed: ${errorMessage}`);
      setIsConnected(false);
      setIsLoading(false);
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  async function createFarmCustomer(e: React.FormEvent) {
    e.preventDefault();

    if (!newCustomerName.trim()) return;

    setIsCreating(true);
    setError(null);

    try {
      await client.models.FarmCustomer.create({
        legalName: newCustomerName.trim(),
        taxId: "",
        yearsInOperation: 0,
        establishedYear: 0,
        primaryContactName: "",
        primaryContactRole: "",
        primaryContactEmail: "",
        physicalStreet: "",
        physicalCity: "",
        physicalState: "",
        physicalZipCode: "",
        email: "",
        totalAcreage: 0,
        ownedAcreage: 0,
        leasedAcreage: 0,
        seasonalSchedule: "",
        fullTimeEmployees: 0,
        seasonalEmployees: 0,
        creditLimit: 0,
        paymentHistory: "",
        annualRevenueEstimate: 0,
        bankName: "",
        annualMaintenanceSchedule: false,
        averageServiceCallsPerYear: 0,
        accountManager: "",
        annualPurchaseVolumeMin: 0,
        annualPurchaseVolumeMax: 0,
        buyingPatterns: "",
        siteAccess: "",
        preferredDeliveryWindows: "",
        storageCapacity: "",
        newsletterSubscribed: false,
        referralSource: ""
      });
      setNewCustomerName("");
    } catch (err) {
      console.error("Error creating farm customer:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to create farm customer: ${errorMessage}`);
    } finally {
      setIsCreating(false);
    }
  }

  async function seedDatabase() {
    setIsSeeding(true);
    setError(null);

    try {
      await runSeedScript();
      console.log("Database seeded successfully!");
    } catch (err) {
      console.error("Error seeding database:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to seed database: ${errorMessage}`);
    } finally {
      setIsSeeding(false);
    }
  }

  async function deleteFarmCustomer(id: string) {
    try {
      await client.models.FarmCustomer.delete({ id });
    } catch (err) {
      console.error("Error deleting farm customer:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to delete farm customer: ${errorMessage}`);
    }
  }

  if (isLoading) {
    return (
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <h1>Farm Customers</h1>
        <p>Connecting to database...</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Farm Customers</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{
            padding: "0.5rem",
            borderRadius: "4px",
            backgroundColor: isConnected ? "#d4edda" : "#f8d7da",
            color: isConnected ? "#155724" : "#721c24"
          }}>
            {isConnected ? "✓ Connected" : "✗ Disconnected"}
          </div>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>

      {/* Seed Database Button */}
      <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#fff3cd", borderRadius: "4px" }}>
        <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Seed Database with Sample Data</p>
        <button
          onClick={seedDatabase}
          disabled={isSeeding || !isConnected}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ffc107",
            border: "none",
            borderRadius: "4px",
            cursor: isSeeding || !isConnected ? "not-allowed" : "pointer"
          }}
        >
          {isSeeding ? "Seeding Database..." : "🌾 Seed Database"}
        </button>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          This will populate the database with sample farm customer data including equipment, crops, and more.
        </p>
      </div>

      <form onSubmit={createFarmCustomer} style={{ marginTop: "2rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={newCustomerName}
          onChange={(e) => setNewCustomerName(e.target.value)}
          placeholder="Enter customer legal name"
          disabled={isCreating || !isConnected}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" disabled={isCreating || !newCustomerName.trim() || !isConnected}>
          {isCreating ? "Creating..." : "+ New Customer"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: "1rem", padding: "0.5rem", backgroundColor: "#fee", borderRadius: "4px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <ul style={{ marginTop: "2rem", listStyle: "none", padding: 0 }}>
        {farmCustomers.length === 0 ? (
          <li style={{ color: "#666", fontStyle: "italic" }}>
            {isConnected ? "No farm customers yet. Create one to get started or seed the database!" : "Waiting for connection..."}
          </li>
        ) : (
          farmCustomers.map((farmCustomer) => (
            <li
              key={farmCustomer.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                marginBottom: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <span>{farmCustomer.legalName}</span>
              <button
                onClick={() => deleteFarmCustomer(farmCustomer.id)}
                style={{ color: "red" }}
                disabled={!isConnected}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;