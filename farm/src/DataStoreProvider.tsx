import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database, Tables } from './supabase.types';
import { FarmCustomerWithRelations } from './Types';

// Types from your database
type FarmCustomer = Tables<'farm_customer'>;

interface DataStoreState {
  // Data
  allFarmCustomers: FarmCustomer[];

  // Active selection
  activeFarmCustomer: FarmCustomerWithRelations | undefined;
  setActiveFarmCustomerId: (farmCustomerId: number | undefined) => void;

  // Loading states
  isLoading: boolean;
  loadingStates: {
    loadingFarmCustomers: boolean;
  };

  // Refresh function
  loadAllFarmCustomers: () => Promise<void>;
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

// Create Supabase client outside component - it only needs to be created once
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {

  // Data state
  const [allFarmCustomers, setAllFarmCustomers] = useState<FarmCustomer[]>([]);

  // Active selection state
  const [activeFarmCustomer, setActiveFarmCustomer] = useState<FarmCustomerWithRelations | undefined>(undefined);
  const [activeFarmCustomerId, setActiveFarmCustomerId] = useState<number | undefined>(undefined);

  // Loading state
  const [loadingStates, setLoadingStates] = useState({
    loadingFarmCustomers: false,
  });

  // Compute overall loading state
  const isLoading = useMemo(
    () => Object.values(loadingStates).some((state) => state),
    [loadingStates]
  );

  // Load function - no dependencies, supabase client is stable
  const loadAllFarmCustomers = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, loadingFarmCustomers: true }));
    try {
      const { data, error } = await supabase
        .from('farm_customer')
        .select('*')
        .order('legal_name', { ascending: true });

      if (error) {
        throw error;
      }

      setAllFarmCustomers(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, loadingFarmCustomers: false }));
    }
  }, []); // Empty dependency array - supabase client is stable

  const loadFarmCustomerWithRelations = useCallback(async (farmCustomerId: number) => {
    try {
      const { data, error } = await supabase
        .from('farm_customer')
        .select(`
        *,
        crop (*),
        contract (*),
        equipment_item (*),
        insurance_policy (*),
        lease (*),
        livestock (*),
        production_metric (*),
        purchase (*),
        replacement_cycle (*),
        trade_in (*),
        warranty (*)
      `)
        .eq('id', farmCustomerId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching farm customer with relations:', error);
      return null;
    }
  }, []);

  // Keep activeFarmCustomer in sync with allFarmCustomers
  useEffect(() => {
    if (activeFarmCustomerId) {
      // Find the updated version of the active FarmCustomer
      const updatedFarmCustomer = allFarmCustomers.find(
        (farmCustomer) => farmCustomer.id === activeFarmCustomerId
      );

      if (updatedFarmCustomer) {
        // Update to the latest version
        loadFarmCustomerWithRelations(updatedFarmCustomer.id).then((data) => {
          if (data) {
            setActiveFarmCustomer(data);
          }
        });
      } else {
        // The FarmCustomer was deleted, clear the selection
        setActiveFarmCustomer(undefined);
      }
    } else {
      setActiveFarmCustomer(undefined);
    }
  }, [allFarmCustomers, loadFarmCustomerWithRelations, activeFarmCustomerId]);

  // Load data on mount - only runs once
  useEffect(() => {
    loadAllFarmCustomers();
  }, [loadAllFarmCustomers]);

  const value = useMemo(
    () => ({
      loadAllFarmCustomers,
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomerId,
      isLoading,
      loadingStates,
    }),
    [
      loadAllFarmCustomers,
      allFarmCustomers,
      activeFarmCustomer,
      setActiveFarmCustomerId,
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