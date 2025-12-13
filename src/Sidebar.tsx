import { Box, IconButton, Drawer, Tooltip, Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDataStore } from './DataStoreProvider';
import { useCallback, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DataTable, { GenerateColumns } from './DataTable';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (edit: boolean) => void;
  onRefresh?: () => Promise<void>;
  positionFromTop: number;
}

function Sidebar({
  isOpen,
  onClose,
  positionFromTop = 16
}: SidebarProps) {
  const [value, setValue] = useState('1');

  const {
    activeFarmCustomer,
  } = useDataStore();

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }, [])

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // You can call onRefresh after save/delete operations like this:
  // const handleSave = async () => {
  //   await client.models.FarmCustomer.create({...});
  //   await onRefresh?.();
  //   handleClose();
  // };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      variant="persistent"
      sx={{
        width: isOpen ? { xs: '100%', sm: '40%' } : 0,
        flexShrink: 0,
      }}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: '40%' },
            top: `${positionFromTop * 4}px`,
            height: `calc(100% - ${positionFromTop * 4}px)`,
            backgroundColor: 'background.paper',
            boxShadow: 3,
            overflowY: 'auto',
            position: 'fixed',
            transition: 'width 0.3s ease-in-out',
          }
        }
      }}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'auto', height: '100%' }}>
        {/* Sticky Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            left: 0,
            height: 64,
            right: 0,
            zIndex: 1,
            backgroundColor: 'grey.300',
            boxShadow: 3,
            padding: 2
          }}
        >
          <Box sx={{ display: 'flex' }}>
            {/* Close Button */}
            <Tooltip title="Close sidebar">
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
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
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
                  },
                }}>
                <ChevronRightIcon style={{ width: 16, height: 16, color: '#4b5563' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {activeFarmCustomer && (
          <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}              >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList 
                    variant='scrollable'
                    onChange={handleTabChange} 
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Crops" value="1" />
                    <Tab label="Contracts" value="2" />
                    <Tab label="Equipment" value="3" />
                    <Tab label="Insurance" value="4" />
                    <Tab label="Lease" value="5" />
                    <Tab label="Livestock" value="6" />
                    <Tab label="Production" value="7" />
                    <Tab label="Purchase" value="8" />
                    <Tab label="Replacement" value="9" />
                    <Tab label="Trade" value="10" />
                    <Tab label="Warranty" value="11" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {activeFarmCustomer.crop.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.crop}
                      columns={GenerateColumns(activeFarmCustomer.crop[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="2">
                  {activeFarmCustomer.contract.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.contract}
                      columns={GenerateColumns(activeFarmCustomer.contract[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="3">
                  {activeFarmCustomer.equipment_item.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.equipment_item}
                      columns={GenerateColumns(activeFarmCustomer.equipment_item[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="4">
                  {activeFarmCustomer.insurance_policy.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.insurance_policy}
                      columns={GenerateColumns(activeFarmCustomer.insurance_policy[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="5">
                  {activeFarmCustomer.lease.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.lease}
                      columns={GenerateColumns(activeFarmCustomer.lease[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="6">
                  {activeFarmCustomer.livestock.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.livestock}
                      columns={GenerateColumns(activeFarmCustomer.livestock[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="7">
                  {activeFarmCustomer.production_metric.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.production_metric}
                      columns={GenerateColumns(activeFarmCustomer.production_metric[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="8">
                  {activeFarmCustomer.purchase.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.purchase}
                      columns={GenerateColumns(activeFarmCustomer.purchase[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="9">
                  {activeFarmCustomer.replacement_cycle.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.replacement_cycle}
                      columns={GenerateColumns(activeFarmCustomer.replacement_cycle[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="10">
                  {activeFarmCustomer.trade_in.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.trade_in}
                      columns={GenerateColumns(activeFarmCustomer.trade_in[0])}
                    />
                  )}
                </TabPanel>
                <TabPanel value="11">
                  {activeFarmCustomer.warranty.length > 0 && (
                    <DataTable
                      data={activeFarmCustomer.warranty}
                      columns={GenerateColumns(activeFarmCustomer.warranty[0])}
                    />
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default Sidebar;