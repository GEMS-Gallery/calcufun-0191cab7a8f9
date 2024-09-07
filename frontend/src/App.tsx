import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FFC107',
    },
  },
});

const App: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = (value: string) => {
    setDisplay(prev => prev + value);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      const [operation, x, y] = display.match(/([\d.]+)([+\-*/])(\d+)/)?.slice(1) || [];
      if (operation && x && y) {
        const result = await backend.calculate(operation, parseFloat(x), parseFloat(y));
        setDisplay(result.toString());
      } else {
        setDisplay('Error');
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setDisplay('Error');
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={display}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: '20px' }}
        />
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                fullWidth
                variant="contained"
                color={['/', '*', '-', '+'].includes(btn) ? 'secondary' : 'primary'}
                onClick={() => btn === '=' ? handleCalculate() : handleClick(btn)}
              >
                {btn}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
        {loading && (
          <CircularProgress
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-20px',
              marginLeft: '-20px',
            }}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default App;
