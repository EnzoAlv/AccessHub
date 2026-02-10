import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Message, Schema, Input } from "rsuite";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType().isEmail("Email inválido").isRequired("Obrigatório"),
  senha: StringType().isRequired("Obrigatório"),
});

export default function LoginPage() {
  const formRef = useRef();
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    const success = await login(formData.email, formData.senha);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="login-header">
          <h2 className="login-title">AccessHub</h2>
          <p className="login-subtitle">Entre para gerenciar seus acessos</p>
        </div>

        {error && <Message showIcon type="error" style={{ marginBottom: 20 }}>{error}</Message>}

        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="email">
            <Form.ControlLabel>Email Corporativo</Form.ControlLabel>
            <Form.Control name="email" accepter={Input} className="custom-input" />
          </Form.Group>

          <Form.Group controlId="senha">
            <Form.ControlLabel>Senha</Form.ControlLabel>
            <Form.Control name="senha" type="password" accepter={Input} className="custom-input" />
          </Form.Group>

          <Button 
            appearance="primary" 
            block 
            type="submit" 
            loading={isLoading} 
            className="login-btn"
          >
            ENTRAR
          </Button>
        </Form>
      </div>
    </div>
  );
}