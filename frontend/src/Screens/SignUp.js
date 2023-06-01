import React, {useState, useEffect} from 'react';
import { TextField, Button, Stack, Alert } from '@mui/material';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import './SignUp.css'
import client from '../api/auth';
import { ContactlessOutlined } from '@material-ui/icons';
 
 
const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages,setErrorMessages]= useState({});
    const [alert,setAlert] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    
    useEffect(() => {
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }, [alert]);     
        
 
    function handleSubmit(event) {
        event.preventDefault();
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        
        const form = {"FirstName":firstName,"LastName":lastName,"Email":email,
        "Password":password, "ConfirmPassword":confirmPassword}
        //console.log(form)
        client.post('/api/User/signup',form,{
            headers: headers
        })
        .then((res)=>{
            if (res.status === 200){
                setEmail("")
                setFirstName("")
                setLastName("")
                setPassword("")
                setConfirmPassword("")
                setErrorMessages({})
                setAlert(true)
            }
            else{
                setErrorMessages({"Email":["Email is already registered!"]})
            }
        })
        .catch((err)=>{
            setErrorMessages(err.response.data)
            //console.log(err.response.data)
        })
    }
 
    return (
        <React.Fragment>
            <div className='signup-box'>
            {alert? <Alert severity="success" sx={{marginTop: 4}}>Account created Successfully!</Alert>:null}
            <h2 >Create SHAPE account</h2>
            <form onSubmit={handleSubmit} id="form">
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        error= {errorMessages.hasOwnProperty("FirstName")}
                        type="text"
                        variant='filled'
                        label="First Name"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                              borderRadius: "50px",
                            }
                          }}                        
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        helperText={errorMessages.hasOwnProperty("FirstName")?errorMessages.FirstName[0]:null}
                        fullWidth
                    />
                    <TextField
                        error= {errorMessages.hasOwnProperty("LastName")}
                        type="text"
                        variant='filled'
                        label="Last Name"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                              borderRadius: "50px",
                            }
                          }}   
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        helperText ={errorMessages.hasOwnProperty("LastName")?errorMessages.LastName[0]:null}
                        fullWidth
                    />
                </Stack>
                <TextField
                    error= {errorMessages.hasOwnProperty("Email")}
                    type="text"
                    variant='filled'
                    label="Work Email Address"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                          borderRadius: "50px",
                        }
                      }}   
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    helperText ={errorMessages.hasOwnProperty("Email")?errorMessages.Email[0]:null}
                    sx={{mb: 4}}
                />
                <TextField
                    error= {errorMessages.hasOwnProperty("Password")}
                    type={showPassword ? "text" : "password"}
                    variant='filled'
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            borderRadius: "50px",
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        )
                    }}   
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    helperText ={errorMessages.hasOwnProperty("Password")?errorMessages.Password[0]:null}
                    fullWidth
                    sx={{mb: 4}}
                />
                <TextField
                    error= {errorMessages.hasOwnProperty("ConfirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    variant='filled'
                    label="Confirm Password"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            borderRadius: "50px",
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                            >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        )
                    }}   
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    helperText ={errorMessages.hasOwnProperty("ConfirmPassword")?errorMessages.ConfirmPassword[0]:null}
                    //required
                    fullWidth
                    sx={{mb: 4}}
                />
                <Button variant="contained"  type="submit"style={{
                    borderRadius: 50,
                    backgroundColor: "darkcyan",
                    textTransform:'none'
                }}>Sign Up</Button>
            </form>
            </div>
     
        </React.Fragment>
    )
}
 
export default SignUp;