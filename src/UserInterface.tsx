import { memo, useState, useCallback, useMemo } from "react";
import { Box, IconButton, Tooltip } from '@mui/material';
import ItemGrid from "./ItemGrid";
import Sidebar from "./Sidebar";
import FarmCustomerTile from "./FarmCustomerTile";
import NavBar from "./NavBar";
import { FarmCustomer } from "./Types"
import { useDataStore } from "./DataStoreProvider";
import Add from '@mui/icons-material/Add';

// Memoized tile component for better performance
const FarmCustomerTileMemo = memo<{
  farmCustomer: FarmCustomer
  isHighlighted?: boolean
  disabled?: boolean
  onClick: () => void
}>(
  ({ farmCustomer, isHighlighted, disabled, onClick }) => (
    <FarmCustomerTile
      key={farmCustomer.id}
      farmCustomer={farmCustomer}
      isHighlighted={isHighlighted}
      disabled={disabled}
      onClick={onClick}
    />
  )
);

function UserInterface() {
  // NavBar height can not be less then 16
  const navBarHeight: number = 16;

  const {
    loadAllFarmCustomers,
    allFarmCustomers,
    activeFarmCustomer,
    setActiveFarmCustomer,
    isLoading,
  } = useDataStore();

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Filter state
  const [disabled, setDisabled] = useState(false);

  // Callbacks
  const activateSidebar = useCallback((farmCustomer: FarmCustomer | undefined) => {
    setActiveFarmCustomer(farmCustomer);
    setIsSidebarOpen(true);
  }, [setActiveFarmCustomer]);

  const handleCloseSidebar = useCallback(() => {
    setActiveFarmCustomer(undefined);
    setIsSidebarOpen(false);
  }, [setActiveFarmCustomer]);

  const handleEditSidebar = useCallback((edit: boolean) => {
    setDisabled(edit);
  }, []);

  // Memoized filtered data (if you need filtering logic, add it here)
  const filteredFarmCustomers = useMemo(() => {
    if (isLoading || !allFarmCustomers.length) return [];
    return allFarmCustomers;
  }, [isLoading, allFarmCustomers]);

  return (
    <>
      <NavBar
        height={navBarHeight}
      />
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
        }} >
        <Box
          sx={{
            flexGrow: 1,
            pt: `${navBarHeight * 4}px`,
          }}
        >
          <Box sx={{ mb: 2 }} />

          <Tooltip title="Create new">
            <IconButton
              onClick={() => activateSidebar(undefined)}
              disabled={disabled}
              sx={{
                position: 'absolute',
                top: 75,
                right: 8,
                zIndex: 50,
                p: 0.75,
                backgroundColor: 'background.paper',
                border: 1,
                borderColor: 'grey.300',
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: (theme: { palette: { primary: { main: unknown; }; }; }) => `0 0 0 2px ${theme.palette.primary.main}`,
                },
              }}>
              <Add style={{ width: 16, height: 16, color: '#4b5563' }} />
            </IconButton>
          </Tooltip>

          {/* Item Grid */}
          <ItemGrid>
            {filteredFarmCustomers?.map((farmCustomer) => (
              <FarmCustomerTileMemo
                key={farmCustomer.id}
                farmCustomer={farmCustomer}
                isHighlighted={activeFarmCustomer?.id === farmCustomer.id}
                disabled={disabled}
                onClick={() => activateSidebar(farmCustomer)}
              />
            ))}
          </ItemGrid>
        </Box>

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          onEdit={handleEditSidebar}
          onRefresh={loadAllFarmCustomers}
          positionFromTop={navBarHeight}
        >
        </Sidebar>
      </Box>
    </>
  );
}

export default UserInterface;