import { Box } from '@mui/material';
import UserInterface from './UserInterface';
import { DataStoreProvider } from './DataStoreProvider';
import '@aws-amplify/ui-react/styles.css';

function App() {

  return (
    <>
      <DataStoreProvider>
        <Box>
          <UserInterface />
        </Box>
      </DataStoreProvider>
    </>
  );
}

export default App;