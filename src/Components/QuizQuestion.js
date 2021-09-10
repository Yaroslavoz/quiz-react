import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Container } from "@material-ui/core";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "30px",
    fontFamily: "Permanent Marker",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  textField: {
    margin: theme.spacing(1),
    width: '50ch',
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
  },
  title: {
    fontSize: "20px",
    fontFamily: "Permanent Marker",
  },
  wrongAnswer: {
    backgroundColor: 'red'
  },
  correctAnswer: {
    backgroundColor: 'green'
  }
}))

export const QuizQuestion = ({ dataToRender }) => {
  const styles = useStyles()
  const [quizCount, setQuizCount] = useState(0)
  const [data, setData] = useState(dataToRender[quizCount])
  const total = dataToRender.length
  const [success, setSuccess] = useState(false);
  

  useEffect(() => {
    const updatedData = dataToRender[quizCount]
    setData(updatedData)
  }, [quizCount, dataToRender])

  const handleChange = (e, index) => {
   
     if(index+1===data.correct){
      e.target.classList.add('green-item')
     } else {e.target.classList.add('red-item')}
     
  };

  const handleCount = () => {
    if((quizCount+1)===total){
      Swal.fire("Great job!", "You've passed the challenge! \n To try one more time - please, refresh the page", "success");
      setSuccess(true);}
      
    setQuizCount(quizCount+1)
  }

   if (success) {
    return <Confetti />;
  }
 return (data &&  <>
    <Typography className={styles.root} component="h2" variant="h5">
      ✨ {data.type} quiz
    </Typography>
    {data.url ? 
    (<>
    <Container maxWidth='xl'>
    <Card className={styles.card} raised>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          image={data.url}
          title="Picture Quiz"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Picture
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={styles.cardText}>
            {data.question}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <List component="nav" aria-label="main mailbox folders">
        {data.answers.map((answer, index) =>( 
          <ListItem key={uuidv4()} button >
            <ListItemIcon>
              <RadioButtonUncheckedIcon  />
            </ListItemIcon >
            <ListItemText primary={answer} onClick={(e)=>handleChange(e, index)}/>
          </ListItem>)
        )}
      </List>
      
      </CardActions>
    </Card>
    </Container>
  
    </>)
    : data.type === 'Text'
    ? (<>
      <Typography variant="h6"  component="h5" className={styles.title}>
            {data.question}
      </Typography>
      <form className={styles.textField} noValidate autoComplete="off">
        <TextField
          id="outlined-multiline-static"
          label="Write your answer.."
          multiline
          fullWidth
          rows={10}
          defaultValue="..here"
          variant="outlined"
        />
        
      </form>
      </>
    )
    :(<>
    <Typography variant="h6"  component="h5" className={styles.title}>
     {data.question}
     </Typography>
      <List component="nav" aria-label="main mailbox folders">
        {data.answers.map((answer, index) =>( 
          <ListItem key={uuidv4()} button >
            <ListItemIcon>
              <RadioButtonUncheckedIcon  />
            </ListItemIcon >
            <ListItemText primary={answer} onClick={(e)=>handleChange(e, index)}/>
          </ListItem>)
        )}
      </List>
    
    </>





      // <form onSubmit={handleSubmit}>
      //   <FormControl component="fieldset" className={styles.formControl}>
      //     <Typography variant="h6"  component="h5" className={styles.title}>
      //       {data.question}
      //     </Typography>
      //     <RadioGroup aria-label="quiz" name="quiz" value={radioValue} onChange={handleRadioChange}>
      //       {data.answers.map((answer, index) => 
      //           <FormControlLabel value={answer} control={<Radio />} label={answer} onClick={(e)=>handleChange(e, index)}/>
      //         )}
      //     </RadioGroup>
      //   </FormControl>
      // </form>
    )
    
    }
    <Button
        variant="contained"
        color="primary"
        onClick={handleCount}
      >
       {quizCount+1 === total? 'Finish': 'Next'}
      </Button>
    </>)
}