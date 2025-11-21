import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { FarmCustomer } from './Types';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';

interface DataStoreState {
  // Data
  allFarmCustomers: FarmCustomer[];

  // Active selection
  activeFarmCustomer: FarmCustomer | undefined;
  setActiveFarmCustomer: (farmCustomer: FarmCustomer | undefined) => void;

  // Loading states
  isLoading: boolean;
  loadingStates: {
    farmCustomers: boolean;
  };
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

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {

  const client = generateClient<Schema>();

  // Data state
  const [allFarmCustomers, setAllFarmCustomers] = useState<FarmCustomer[]>([]);

  // Active selection state
  const [activeFarmCustomer, setActiveFarmCustomer] = useState<FarmCustomer | undefined>(undefined);

  // Loading state
  const [loadingStates, setLoadingStates] = useState({
    farmCustomers: true,
  });

  // Compute overall loading state
  const isLoading = useMemo(
    () => Object.values(loadingStates).some((state) => state),
    [loadingStates]
  );

  // Keep activeFarmCustomer in sync with allFarmCustomers
  useEffect(() => {
    if (activeFarmCustomer) {
      // Find the updated version of the active FarmCustomer
      const updatedFarmCustomer = allFarmCustomers.find(
        (farmCustomer) => farmCustomer.id === activeFarmCustomer.id
      );

      if (updatedFarmCustomer) {
        // Update to the latest version from the subscription
        setActiveFarmCustomer(updatedFarmCustomer);
      } else {
        // The FarmCustomer was deleted, clear the selection
        setActiveFarmCustomer(undefined);
      }
    }
  }, [allFarmCustomers, activeFarmCustomer]);

  // Combined subscription effect for all data
  useEffect(() => {
    // Subscribe to FarmCustomer
    const farmCustomerSubscription = client.models.FarmCustomer.observeQuery().subscribe({
      next: (data) => {
        const farmCustomers = data.items
          .filter(
            (item) =>
              item !== null && item !== undefined
          )
          .sort((a, b) => a.legalName.localeCompare(b.legalName));
        setAllFarmCustomers(farmCustomers);
        setLoadingStates((prev) => ({ ...prev, farmCustomers: false }));
      },
    });

    // Cleanup all subscriptions
    return () => {
      farmCustomerSubscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomer,
      isLoading,
      loadingStates,
    }),
    [
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomer,
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