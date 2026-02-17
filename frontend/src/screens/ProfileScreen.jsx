import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from '../components/Loader';
import { toast } from "react-toastify";
import { setCredentials } from "../slices/AuthSlice";
import { useUpadateMutation } from "../slices/usersApiSlice";



const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [upadateProfile, {isLoading }] = useUpadateMutation();
    
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setName, userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword ) {
            toast.error('Passwords mismatch');
        } else {
            try {
                const res = await upadateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res }))
                toast.success("Profile updated")
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    return (
        <FormContainer>
            <h1>Upadate Profile</h1>
            <Form onSubmit={ submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                { isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Upadate
                </Button>
                
            </Form>
        </FormContainer>
    )
}
export default ProfileScreen;