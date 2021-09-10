import { useState, useEffect } from 'react'
import logo from './logo.svg';
import pic from './images/q1.png';
import { QUIZ_DATA } from './data/quiz-data'
import './App.css';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { QuizContainer } from './Components/QuizContainer'
import { QuizQuestion } from './Components/QuizQuestion';


const useStyles = makeStyles((theme) => ({
  root: { 
    margin: theme.spacing(3, 0, 2),
    textAlign: "center",
    fontSize: "40px",
    fontFamily: "Permanent Marker",
    color: "#61dafb",
    textShadow: "1px 1px #2a606e"
  },
  card: {
    margin: theme.spacing(1),
    backgroundColor: '#697A21',
    color: '#DDF0FF'
  },
  cardText: {
    color: '#DDF0FF'
  },
  media: {
    height: 280,
    objectFit: "contain"
  }
}))

function App() {
  const [isStartPage, setStartPage] = useState(true)
  const [dataToRender, setDataToRender] = useState(QUIZ_DATA)
  const styles = useStyles()
  useEffect(() => {
    setDataToRender(QUIZ_DATA)
    
  }, [])



  const handleQuizChoice = (e) =>{
    const choice = e.currentTarget.id
    switch(choice){
      case 'Test':
        const simple = dataToRender.filter(question => question.type === "Test")
        setDataToRender(simple)
        break
      case 'Text':
        const questiontask = dataToRender.filter(question => question.type === "Text")
        setDataToRender(questiontask)
        break
      case 'Picture':
        const picturestask = dataToRender.filter(question => question.type === "Picture")
        setDataToRender(picturestask)
        break
      default: setDataToRender(['empty'])
    }
    setStartPage(false)
    
  }

  return (
    <Container maxWidth="md">
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography className={styles.root} component="h1" variant="h5">
            Quiz Reactor Component
        </Typography>
      </header>
      {isStartPage ? 
      (<Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>

        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.media}
              component="img"
              alt="simple dimple quiz"
              image={pic}
              title="quiz"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Simple quiz
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={styles.cardText}>
                Here you can try your skills..or knowledges in js area
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button id='Test' variant="contained" onClick={handleQuizChoice}>Simple quiz</Button>
          </CardActions>
        </Card>


        
      </Grid>
      <Grid item xs={12} sm={6} md={4}>

      <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.media}
              component="img"
              alt="text quiz"
              image="https://bit.ly/3jRpobt"
              title="text quiz"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Text quiz
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={styles.cardText}>
                Type the multiple questions in text area. Write about
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button id="Text" variant="contained" color="primary" onClick={handleQuizChoice}>
              Bla-bla QA
            </Button>
          </CardActions>
        </Card>


        
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.media}
              component="img"
              alt="picture quiz"
              image="https://bit.ly/3nf6T2Q"
              title="picture quiz"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Guess the picture
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={styles.cardText}>
                Try to find the image described in question
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button id="Picture" variant="contained" color="secondary" onClick={handleQuizChoice}>
              Picture quiz
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>) :

    (<QuizContainer>
      {dataToRender && dataToRender[0] !== 'empty' && 
        <QuizQuestion dataToRender={dataToRender} />}
    </QuizContainer>)
    }
    </div>
    </Container>
  );
}

export default App;
