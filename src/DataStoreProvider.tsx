import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { FarmCustomer, Crop } from './Types';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';

interface DataStoreState {
  // Data
  allFarmCustomers: FarmCustomer[];
  crops: Crop[];

  // Active selection
  activeFarmCustomer: FarmCustomer | undefined;
  setActiveFarmCustomer: (farmCustomer: FarmCustomer | undefined) => void;

  // Loading states
  isLoading: boolean;
  loadingStates: {
    farmCustomers: boolean;
    crops: boolean;
  };

  // Refresh function
  loadAllFarmCustomers: () => Promise<void>;
  loadCrops: () => Promise<void>;
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
  const [crops, setCrops] = useState<Crop[]>([]);

  // Active selection state
  const [activeFarmCustomer, setActiveFarmCustomer] = useState<FarmCustomer | undefined>(undefined);

  // Loading state
  const [loadingStates, setLoadingStates] = useState({
    farmCustomers: false,
    crops: false,
  });

  // Compute overall loading state
  const isLoading = useMemo(
    () => Object.values(loadingStates).some((state) => state),
    [loadingStates]
  );

  // Load function - no dependencies, client is stable
  const loadAllFarmCustomers = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, farmCustomers: true }));
    try {
      const result = await client.models.FarmCustomer.list();
      const farmCustomers = result.data
        .filter((item) => item !== null && item !== undefined)
        .sort((a, b) => a.legalName.localeCompare(b.legalName));
      setAllFarmCustomers(farmCustomers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, farmCustomers: false }));
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
    }
  }, [allFarmCustomers, activeFarmCustomer]);

  // Load data on mount - only runs once
  useEffect(() => {
    loadAllFarmCustomers();
  }, [loadAllFarmCustomers]);

  const loadCrops = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, crops: true }));
    try {
      const result = await client.models.Crop.list();
      const crops = result.data
        .filter((item) => item !== null && item !== undefined)
        .sort((a, b) => a.acreage - b.acreage);
      setCrops(crops);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, crops: false }));
    }
  }, []); // Empty dependency array - client is stable

  const value = useMemo(
    () => ({
      loadAllFarmCustomers,
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomer,
      loadCrops,
      crops,
      isLoading,
      loadingStates,
    }),
    [
      loadAllFarmCustomers,
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomer,
      loadCrops,
      crops,
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