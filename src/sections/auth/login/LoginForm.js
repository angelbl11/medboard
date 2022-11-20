import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';

import { LoadingButton } from '@mui/lab';

// components
import { AuthContext } from '../../../context/authcontext';
import Iconify from '../../../components/iconify';
import { auth } from '../../../firebase';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: 'LOGIN', payload: user });
        navigate('/dashboard', { replace: true });
        // ...
      })
      .catch((error) => {
        setShowError(true);
      });
  };

  return (
    <form onSubmit={handleClick}>
      <Stack spacing={3}>
        <TextField type={'email'} name="email" label="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {showError && <Alert severity="error">Email o contraseña incorrecta</Alert>}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Iniciar sesión
      </LoadingButton>
    </form>
  );
}
