import { Box, IconButton, Drawer, Tooltip } from '@mui/material';
import { useDataStore } from './DataStoreProvider';
import { useEffect, useCallback } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

  const {
    activeFarmCustomer,
  } = useDataStore();

  // Handle drawer open/close
  useEffect(() => {
    if (isOpen) {
      // TODO: 9879 handle this
    }
  }, [activeFarmCustomer, isOpen]);

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
            backgroundColor: 'sidebarColor.main',
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
      </Box>
    </Drawer>
  );
}

export default Sidebar;