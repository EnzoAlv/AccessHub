import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  Button,
  Message,
  Panel,
  Schema,
} from "rsuite";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

const { StringType } = Schema.Types;
const validationModel = Schema.Model({
  email: StringType()
    .isEmail("Por favor, insira um email válido.")
    .isRequired("Email é obrigatório."),
  senha: StringType()
    .isRequired("Senha é obrigatória.")
    .minLength(1, "Senha não pode estar vazia."),
});

export default function LoginPage() {
  const formRef = useState(null)[0];

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current?.check()) {
      console.log("Formulário inválido");
      return;
    }

    const success = await login(formData.email, formData.senha);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Container className="login-container">
      <div className="login-wrapper">
        <Panel className="login-panel" bordered>
          <h2 className="login-title">AccessHub</h2>
          <p className="login-subtitle">Sistema de Gestão de Acessos</p>

          {error && (
            <Message showIcon type="error" className="login-error">
              {error}
            </Message>
          )}

          <Form
            ref={formRef}
            model={validationModel}
            onSubmit={handleSubmit}
            onChange={(data) => setFormData(data)}
            formValue={formData}
          >
            <FormGroup>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <FormControl
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                disabled={isLoading}
                accepter={<input />}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <FormControl
                name="senha"
                type="password"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={(value) => handleChange("senha", value)}
                disabled={isLoading}
                accepter={<input />}
              />
            </FormGroup>

            <FormGroup>
              <Button
                type="submit"
                appearance="primary"
                block
                loading={isLoading}
                disabled={isLoading}
                className="login-button"
              >
                {isLoading ? "Autenticando..." : "Entrar"}
              </Button>
            </FormGroup>
          </Form>

          <p className="login-footer">
            Não tem uma conta? <a href="#signup">Contate o administrador</a>
          </p>
        </Panel>
      </div>
    </Container>
  );
}
