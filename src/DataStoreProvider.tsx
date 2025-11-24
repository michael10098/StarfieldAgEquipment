import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { FarmCustomer, Crop } from './Types';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';

interface DataStoreState {
  // Data
  allFarmCustomers: FarmCustomer[];

  // Active selection
  activeFarmCustomer: FarmCustomer | undefined;
  setActiveFarmCustomer: (farmCustomer: FarmCustomer | undefined) => void;
  activeCrops: Crop[] | undefined;

  // Loading states
  isLoading: boolean;
  loadingStates: {
    loadingFarmCustomers: boolean;
    loadingActiveCrops: boolean;
  };

  // Refresh function
  loadAllFarmCustomers: () => Promise<void>;
  loadActiveCrops: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreState | undefined>(undefined);

export const useDataStore = () => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error('useDataStore must be used within a DataStoreProvider');
  }
  return context;
};

interface DataStoreProviderProps {
  children: ReactNode;
}

// Create client outside component - it only needs to be created once
const client = generateClient<Schema>();

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {

  // Data state
  const [allFarmCustomers, setAllFarmCustomers] = useState<FarmCustomer[]>([]);

  // Active selection state
  const [activeFarmCustomer, setActiveFarmCustomer] = useState<FarmCustomer | undefined>(undefined);
  const [activeCrops, setActiveCrops] = useState<Crop[] | undefined>(undefined);

  // Loading state
  const [loadingStates, setLoadingStates] = useState({
    loadingFarmCustomers: false,
    loadingActiveCrops: false,
  });

  // Compute overall loading state
  const isLoading = useMemo(
    () => Object.values(loadingStates).some((state) => state),
    [loadingStates]
  );

  // Load function - no dependencies, client is stable
  const loadAllFarmCustomers = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, loadingFarmCustomers: true }));
    try {
      const result = await client.models.FarmCustomer.list();
      const farmCustomers = result.data
        .filter((item) => item !== null && item !== undefined)
        .sort((a, b) => a.legalName.localeCompare(b.legalName));
      setAllFarmCustomers(farmCustomers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, loadingFarmCustomers: false }));
    }
  }, []); // Empty dependency array - client is stable

  // Keep activeFarmCustomer in sync with allFarmCustomers
  useEffect(() => {
    if (activeFarmCustomer) {
      // Find the updated version of the active FarmCustomer
      const updatedFarmCustomer = allFarmCustomers.find(
        (farmCustomer) => farmCustomer.id === activeFarmCustomer.id
      );

      if (updatedFarmCustomer) {
        // Update to the latest version
        setActiveFarmCustomer(updatedFarmCustomer);
      } else {
        // The FarmCustomer was deleted, clear the selection
        setActiveFarmCustomer(undefined);
      }
      // set the active crops to undefined since the activeFarmCustomer has changed
      setActiveCrops(undefined);
    }
  }, [allFarmCustomers, activeFarmCustomer]);

  // Load data on mount - only runs once
  useEffect(() => {
    loadAllFarmCustomers();
  }, [loadAllFarmCustomers]);

  const loadActiveCrops = useCallback(async () => {
    if (activeFarmCustomer) {
      setLoadingStates((prev) => ({ ...prev, loadingActiveCrops: true }));
      try {
        const result = await client.models.Crop.list({
          filter: {
            farmCustomerId: {
              eq: activeFarmCustomer.id
            }
          }
        });
        const activeCrops = result.data
          .filter((item) => item !== null && item !== undefined)
          .sort((a, b) => a.acreage - b.acreage);
        setActiveCrops(activeCrops);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, loadingActiveCrops: false }));
      }
    }
  }, [activeFarmCustomer]); // Empty dependency array - client is stable

  const value = useMemo(
    () => ({
      loadAllFarmCustomers,
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomer,
      loadActiveCrops,
      activeCrops,
      isLoading,
      loadingStates,
    }),
    [
      loadAllFarmCustomers,
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomer,
      loadActiveCrops,
      activeCrops,
      isLoading,
      loadingStates,
    ]
  );

  return (
    <DataStoreContext.Provider value={value}>
      {children}
    </DataStoreContext.Provider>
  );
};