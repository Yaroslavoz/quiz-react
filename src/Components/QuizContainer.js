import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}))

export const QuizContainer = ({ children }) => {
  const styles = useStyles()
  return (
    <Container container="main" maxWidth="xs" className={styles.root} >
      {children}
    </Container>
  )
}