/*CU - 10 Loguearse en el sistema*/
/* React-Component Login
Implementacion de la clase Panel Login
Por defecto retorna el renderizado de la pantalla Login
Interactua con el controlador Login para poder acceder al metodo login/verificarLogin de este
*/
import { Button, Col, Input, Row, Form } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../components/Paper";
import styled from "styled-components";
import { config, IUsersToApi } from "../../shared/api";
import { useHistory } from "react-router-dom";
import { paths } from "../../shared/routes/paths";
import cerroVerde from "../../asssets/cerro-verde.jpg";
import { ReactComponent as Sinnens } from "../../asssets/sinnens-logo.svg";
import axios from "axios";
import { useAuth } from "../../shared/AuthContext/AuthContext";

export const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const onSend = async (event: any) => {
    console.log(event);
    const success = await login(event);
    if (success === true) {
      history.push(paths.users.default);
    }
  };
  return (
    <StyledContainer style={{ backgroundImage: `url(${cerroVerde})` }}>
      <StyledForm>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onSend}
          autoComplete="off"
        >
          <Row>
            <Col span={8} />
            <Col span={16}>
              <Sinnens />
            </Col>
            <Col span={8} />
          </Row>
          <Row>
            <Col span={24} style={{ padding: "8px 32px" }}>
              <Form.Item
                label="Ingresa tu Usuario"
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ padding: "8px 32px" }}>
              <Form.Item
                label="Ingresa tu Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <StyledBottomButtons>
              <Button type="primary" htmlType="submit">
                Ingresar al Sistema
              </Button>
            </StyledBottomButtons>
          </Form.Item>
        </Form>
      </StyledForm>
    </StyledContainer>
  );
};

const StyledBottomButtons = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;

const StyledImage = styled.img``;

const StyledContainer = styled.div`
  width: 700px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #fff;
  margin: 150px auto 0 auto;
`;

const StyledForm = styled.div`
  padding: 40px 0;
  margin-left: 300px;
  height: 450px;
  width: 400px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #fff;
`;
