import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageKaryawanDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [karyawan, setKaryawan] = useState({})
  const karyawanChangeListener = useChangeListener();
  const karyawanValidator = useValidator({});

  const onKaryawanUpdate = () => {
    karyawanValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(`${BASE_URL}/karyawan/${params.id}/`, karyawan, config).then((response) => {
      message.success(response);
      navigate("/")
    }).catch((error) => {
      message.error(error)
      karyawanValidator.except(error)
    })
  }

  const onKaryawanDelete = () => {
    message.confirmRemove(() => {
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(`${BASE_URL}/karyawan/${params.id}/`, config).then((response) => {
        message.success(response);
        navigate("/")
      }).catch((error) => {
        message.error(error)
      })
    })
  }

  const onKaryawanDetail = () => {
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(`${BASE_URL}/karyawan/${params.id}/`, config).then((response) => {
      setKaryawan(response.data)
    }).catch((error) => {
      message.error(error)
    })
  }

  useEffect(() => {
    // panggil fungsi detail barang
    if (params.id) {
      onKaryawanDetail()
    }
  }, [params.id]);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Karyawan Detail</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                
                <Card.Subtitle className={"mb-3"}>NIK</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    className={"bg-body-tertiary"}
                    value={karyawan.nik}
                    name={"nik"}
                    disabled
                  />
                </Form.Group>
                <Card.Subtitle className={"mb-3"}>Nama Karyawan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama Karyawan"}
                    className={"bg-body-tertiary"}
                    value={karyawan.nama}
                    name={"nama"}
                    onChange={(e) => karyawanChangeListener.onChangeText(e, karyawan, setKaryawan)}
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation messages={karyawanValidator.get('nama')} />
                </Form.Group>
                {JSON.stringify(karyawan)}
                <Card.Subtitle className={"mb-3"}>Jabatan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    className={"bg-body-tertiary"}
                    value={karyawan.jabatan && karyawan.jabatan.nama ? karyawan.jabatan.nama : ''}
                    disabled
                  />
                </Form.Group>
                <Card.Subtitle className={"mb-3"}>Gaji Pokok</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    className={"bg-body-tertiary"}
                    value={karyawan.jabatan && karyawan.jabatan.gajiPokok!==0 ? karyawan.jabatan.gajiPokok : 0}
                    disabled
                  />
                </Form.Group>
                <Card.Subtitle className={"mb-3"}>Tunjangan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    className={"bg-body-tertiary"}
                    value={karyawan.jabatan && karyawan.jabatan.tunjangan!==0 ? karyawan.jabatan.tunjangan : 0}
                    disabled
                  />
                </Form.Group>
              </Card.Body>
              {/* <Card.Body>
                <Card.Subtitle className={"mb-3"}>Potongan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Jumlah Potongan"}
                    className={"bg-body-tertiary"}
                    value={karyawan.potongan}
                    name={"potongan"}
                    onChange={(e) => potonganChangeListener.onChangeText(e, potongan, setPotongan)}
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation messages={potonganValidator.get('potongan')} />
                </Form.Group>
              </Card.Body> */}
            </Card>
          </Col>
        </Row>
        

        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button variant={"outline-secondary"} onClick={() => navigate("/")}>Batal</Button>
            <Button variant={"outline-secondary"} onClick={onKaryawanDelete}>Hapus</Button>
            <Button onClick={onKaryawanUpdate}>Update</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageKaryawanDetail;