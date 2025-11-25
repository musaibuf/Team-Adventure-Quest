import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  Paper,
  Alert,
  CssBaseline
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// --- CONFIGURATION ---

const CARNELIAN = '#B31B1B'; // Carnelian Red Branding

const COMMON_INSTRUCTIONS = `In the following simple arithmetic problems:
• A plus (+) sign means to multiply
• A divide (÷) sign means to add
• A minus (−) sign means to divide
• A times (x) sign means to subtract

Complete the problems following these directions. You must get 100% to unlock your clue.`;

const TEAMS = [
  {
    id: 1,  
    name: 'Team 1 – Blue',
    color: '#1976d2', // Blue
    contrastText: '#fff',
    questions: [
      { id: 'q1', label: '8 + 2', answer: 16 },
      { id: 'q2', label: '9 + 11', answer: 99 },
      { id: 'q3', label: '4 x 3', answer: 1 },
      { id: 'q4', label: '6 ÷ 2', answer: 8 },
      { id: 'q5', label: '9 − 3', answer: 3 },
      { id: 'q6', label: '7 x 4', answer: 3 },
      { id: 'q7', label: '4 + 4', answer: 16 },
      { id: 'q8', label: '8 − 4', answer: 2 },
      { id: 'q9', label: '12 x 2', answer: 10 },
      { id: 'q10', label: '20 − 10', answer: 2 },
    ],
  },
  {
    id: 2,
    name: 'Team 2 – Yellow',
    color: '#fbc02d', // Yellow
    contrastText: '#000',
    questions: [
      { id: 'q11', label: '9 − 1', answer: 9 },
      { id: 'q12', label: '5 + 6', answer: 30 },
      { id: 'q13', label: '2 x 1', answer: 1 },
      { id: 'q14', label: '10 − 5', answer: 2 },
      { id: 'q15', label: '12 + 2', answer: 24 },
      { id: 'q16', label: '6 ÷ 6', answer: 12 },
      { id: 'q17', label: '8 + 5', answer: 40 },
      { id: 'q18', label: '6 + 6', answer: 36 },
      { id: 'q19', label: '17 x 2', answer: 15 },
      { id: 'q20', label: '14 ÷ 7', answer: 21 },
    ],
  },
  {
    id: 3,
    name: 'Team 3 – Green',
    color: '#2e7d32', // Green
    contrastText: '#fff',
    questions: [
      { id: 'q21', label: '14 − 7', answer: 2 },
      { id: 'q22', label: '6 x 5', answer: 1 },
      { id: 'q23', label: '8 + 3', answer: 24 },
      { id: 'q24', label: '7 x 2', answer: 5 },
      { id: 'q25', label: '9 + 2', answer: 18 },
      { id: 'q26', label: '8 − 4', answer: 2 },
      { id: 'q27', label: '9 + 6', answer: 54 },
      { id: 'q28', label: '1 ÷ 1', answer: 2 },
      { id: 'q29', label: '8 x 7', answer: 1 },
      { id: 'q30', label: '13 − 1', answer: 13 },
    ],
  },
  {
    id: 4,
    name: 'Team 4 – Red',
    color: '#d32f2f', // Red
    contrastText: '#fff',
    questions: [
      { id: 'q31', label: '16 − 4', answer: 4 },
      { id: 'q32', label: '8 x 2', answer: 6 },
      { id: 'q33', label: '9 ÷ 9', answer: 18 },
      { id: 'q34', label: '6 x 2', answer: 4 },
      { id: 'q35', label: '8 + 4', answer: 32 },
      { id: 'q36', label: '10 − 2', answer: 5 },
      { id: 'q37', label: '4 − 1', answer: 4 },
      { id: 'q38', label: '18 − 3', answer: 6 },
      { id: 'q39', label: '8 + 2', answer: 16 },
      { id: 'q40', label: '15 x 3', answer: 12 },
    ],
  },
];

// --- MAIN COMPONENT ---

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Theme setup
  const theme = createTheme({
    palette: {
      primary: {
        main: selectedTeam ? selectedTeam.color : CARNELIAN,
      },
    },
  });

  // Handle selecting a team from the home screen
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setAnswers({});
    setIsSuccess(false);
    setError('');
    window.scrollTo(0, 0);
  };

  // Handle input changes in the form
  const handleInputChange = (qId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  // Validate answers
  const handleSubmit = () => {
    if (!selectedTeam) return;

    let allCorrect = true;
    
    // Check if all questions are answered and correct
    for (let q of selectedTeam.questions) {
      const userVal = parseInt(answers[q.id]);
      if (isNaN(userVal) || userVal !== q.answer) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setIsSuccess(true);
      setError('');
      window.scrollTo(0, 0);
    } else {
      setError('Incorrect answers found. Please check your math rules and try again!');
      setIsSuccess(false);
    }
  };

  // Go back to home
  const handleBack = () => {
    setSelectedTeam(null);
    setAnswers({});
    setIsSuccess(false);
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {selectedTeam ? selectedTeam.name : 'Team Adventure Quest'}
          </Typography>
          {selectedTeam && !isSuccess && (
            <Button color="inherit" onClick={handleBack}>
              Change Team
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        
        {/* SCREEN 1: TEAM SELECTION */}
        {!selectedTeam && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            {/* LOGO SECTION */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img 
                src="/logo.png" 
                alt="Logo" 
                style={{ maxWidth: '180px', height: 'auto' }} 
              />
            </Box>

            <Typography variant="h5" align="center" gutterBottom sx={{ color: CARNELIAN, fontWeight: 'bold', mb: 3 }}>
              Select Your Team
            </Typography>
            
            {/* UPDATED BUTTON LIST */}
            <Box sx={{ maxWidth: 600, mx: 'auto', width: '100%' }}>
              {TEAMS.map((team) => (
                <Button
                  key={team.id}
                  variant="contained"
                  fullWidth
                  onClick={() => handleTeamSelect(team)}
                  sx={{
                    backgroundColor: team.color,
                    color: team.contrastText,
                    fontWeight: 'bold',
                    py: 3,
                    mb: 2,
                    fontSize: '1.25rem',
                    '&:hover': {
                      backgroundColor: team.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  {team.name}
                </Button>
              ))}
            </Box>

          </Box>
        )}

        {/* SCREEN 2: QUIZ FORM */}
        {selectedTeam && !isSuccess && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: selectedTeam.color, fontWeight: 'bold' }}>
              Math Test
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line', fontSize: '0.7rem' }}>
                {COMMON_INSTRUCTIONS}
              </Typography>
            </Alert>

            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                {selectedTeam.questions.map((q, index) => (
                  <Grid item xs={12} sm={6} key={q.id}>
                    <TextField
                      label={`(Q${index + 1}) ${q.label} = ?`}
                      variant="outlined"
                      fullWidth
                      type="number"
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {error}
                </Alert>
              )}

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 4, bgcolor: selectedTeam.color }}
                onClick={handleSubmit}
              >
                Submit Answers
              </Button>
            </Box>
          </Paper>
        )}

        {/* SCREEN 3: SUCCESS (NO BUTTON) */}
        {selectedTeam && isSuccess && (
          <Card elevation={5} sx={{ borderTop: `6px solid ${selectedTeam.color}` }}>
            <CardContent sx={{ textAlign: 'center', py: 5 }}>
              
              <Typography variant="h4" gutterBottom sx={{ color: 'green', fontWeight: 'bold' }}>
                Congratulations!
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 2 }}>
                You are successfully done with the math test.
              </Typography>

            </CardContent>
          </Card>
        )}

      </Container>
    </ThemeProvider>
  );
}

export default App;