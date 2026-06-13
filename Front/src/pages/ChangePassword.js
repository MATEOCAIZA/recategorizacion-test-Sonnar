import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import config from '../config';
import Cookies from 'js-cookie';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePassword = () => {
    const navigate = useNavigate();

    const [actualPassword, setActualPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showActualPassword, setShowActualPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowActualPassword = () => setShowActualPassword((show) => !show);
    const handleMouseDownActualPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'actualPassword') {
            setActualPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        };
    };

    const handleCancelar = () => {
        navigate('/');
    };

    const handleChangePassword = async () => {
        const userId = Cookies.get('id');

        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        };

        try {
            const response = await  fetch(`${config.apiBaseUrl}/change-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: Cookies.get('token')
                },
                body: JSON.stringify({
                    currentPassword: actualPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data);
                setActualPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(data);
            };
        } catch (error) {
            toast.error('Error al cambiar la contraseña');
        };
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70%',
                    borderRadius: '1rem',
                    marginTop: '2rem',
                }}
            >
                <h1 style={{ color: "rgb(35, 31, 40)", textAlign: "center" }}>Cambiar contraseña</h1>
                <FormControl sx={{ m: 1, width: '60%' }} variant='outlined'>
                    <InputLabel required htmlFor="outlined-adornment-password">Contraseña actual</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showActualPassword ? 'text' : 'password'}
                        name='actualPassword'
                        value={actualPassword}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowActualPassword}
                                    onMouseDown={handleMouseDownActualPassword}
                                    edge='end'
                                >
                                    {showActualPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Contraseña actual'
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '60%' }} variant='outlined'>
                    <InputLabel required htmlFor="outlined-adornment-password">Contraseña nueva</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showNewPassword ? 'text' : 'password'}
                        name='newPassword'
                        value={newPassword}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownNewPassword}
                                    edge='end'
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Contraseña nueva'
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '60%' }} variant='outlined'>
                    <InputLabel required htmlFor="outlined-adornment-password">Confirmar contraseña</InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                    edge='end'
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Confirmar contraseña'
                    />
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ margin: '.5rem .5rem '}}
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ margin: '.5rem .5rem '}}
                        onClick={handleChangePassword}
                    >
                        Cambiar contraseña
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ChangePassword;