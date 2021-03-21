import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { signup } from "../reducers/user";
import {Checkbox} from "@material-ui/core"
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const BOX = styled.div`
  background: mediumseagreen;
  border-left: 10px solid red;  
`

export const StyledAuth = styled.div`
  width: 385px;
  padding: 3rem 1.5rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 8% auto;

  h2 {
    margin-bottom: 1.3rem;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-group input:last-child {
    margin-left: 0.7rem;
  }

  input {
    overflow: hidden;
    border-radius: 3px;
    width: 100%;
    padding: 0.6rem 1.2rem;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.primaryColor};
  }

  .action {
    margin-top: 1rem;
  }

  button {
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.red};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }

  @media screen and (max-width: 430px) {
    margin: 20% auto;
    width: 90%;
  }
`;


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Signup = ({ setAuth }) => {
  const identityclasses = useStyles();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [identity, setIdentity] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setIdentity(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const firstname = useInput("");
  const lastname = useInput("");
  const username = useInput("");
  const email = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstname.value.trim() ||
      !lastname.value.trim() ||
      !username.value.trim() ||
      !email.value.trim() ||
      !password1.value.trim() ||
      !password2.value.trim()
    ) {
      return toast.error("Please fill in all the fields");
    }

    if (password1.value !== password2.value) {
      return toast.error("Password does not match");
    }

    if (username.value.length <= 3) {
      return toast.error("Username should be atleast four characters long");
    }

    const re = /^[a-z0-9\x20]+$/i;
    if (!re.exec(username.value)) {
      return toast.error("Choose a better username");
    }

    const payload = {
      identity: identity,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password1.value,
      birthyear: selectedDate.getFullYear(),
      birthmonth:selectedDate.getMonth(),
      birthday:selectedDate.getDate()
    };

    const clearForm = () => {
      username.setValue("");
      firstname.setValue("");
      lastname.setValue("");
      email.setValue("");
      password1.setValue("");
      password2.setValue("");
    };

    dispatch(signup({ payload, clearForm }));
  };

  return (
      <StyledAuth>
	 
    <h2>Create your account</h2>
	  <form onSubmit={handleSubmit}>
        <div>
          <FormControl className={identityclasses.formControl}>
          <InputLabel id="identity">identity</InputLabel>
          <Select
            labelId="identyti"
            id="identity-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={identity}
            onChange={handleChange}
          >
            <MenuItem value={"student"}>Student</MenuItem>
            <MenuItem value={"teacher"}>Teacher</MenuItem>
            <MenuItem value={"parent"}>Parent</MenuItem>
          </Select>
        </FormControl>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="firstname"
            value={firstname.value}
            onChange={firstname.onChange}
          />
          <input
            type="text"
            placeholder="lastname"
            value={lastname.value}
            onChange={lastname.onChange}
          />
        </div>
        <input
          type="text"
          placeholder="username"
          value={username.value}
          onChange={username.onChange}
        />
        <input
          type="email"
          placeholder="email"
          value={email.value}
          onChange={email.onChange}
        />
        <div className="input-group">
          <input
            type="password"
            placeholder="password"
            value={password1.value}
            onChange={password1.onChange}
          />
          <input
            type="password"
            placeholder="confirm"
            value={password2.value}
            onChange={password2.onChange}
          />
        </div>
        <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Birthday"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </MuiPickersUtilsProvider>
        </div>

        <div className="action input-group">
          <span className="pointer" onClick={() => setAuth("LOGIN")}>
            Signin instead
          </span>
          <button>Sign Up</button>
        </div>
      </form>
    </StyledAuth>
  );
};

export default Signup;
