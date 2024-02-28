import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_URL } from "../../src/libs/config/settings.js";
import WidgetPotonganChoice from "../Potongan/WidgetPotonganChoice.jsx";
import useJWT from "../../src/libs/hooks/useJWT.jsx";
import useMessage from "../../src/libs/hooks/useMessage.jsx";
import useChangeListener from "../../src/libs/hooks/useChangeListener.jsx";
import useHTTP from "../../src/libs/hooks/useHTTP.jsx";
import WidgetJabatanChoice from "../jabatan/WidgetJabatanChoice.jsx";
import useValidator from "../../src/libs/hooks/useValidator.jsx";

const WidgetKaryawanCreateModal = ({ callback }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [karyawan, setKaryawan] = useState({
    nik: "",
    nama: "",
    alamat: "",
    no_Telepon: "",
    bank: "",
    no_rekening: "",
  });

  // const karyawanValidator = useValidator({
  //     nik: [],
  //     nama: [],
  //     alamat: [],
  //     no_Telepon: [],
  //     bank: [],
  //     no_rekening: []
  // })

  const [jabatan, setJabatan] = useState({
    nama: "",
    gajiPokok: 0,
    tunjangan: 0,
  });

  const [absensi, setAbsensi] = useState({
    Hadir: 0,
    Alpa: 0,
    Terlambat: 0,
  });

  // const absensiValidator = useValidator({
  //   Hadir: [],
  //   Alpa: [],
  //   Terlambat: [],
  // });

  // const jabatanValidator = useValidator({
  //     nama: [],
  //     gajiPokok: [],
  //     tunjangan: []
  // })

  const [potongans, daftarPotongans] = useState([]);

  const onCallbackPotonganChoice = (potongan) => {
    const potonganExist = potongans.find((obj) => obj._id === potongan._id);

    if (potonganExist) {
      return;
    }

    daftarPotongans([...potongans, potongan]);
  };

  const [jabatans, setdaftarJabatans] = useState([]);

  const onCallbackJabatanChoice = (jabatan) => {
    setJabatan(jabatan);
  };

  const onKaryawanCreate = () => {
    const url = `${BASE_URL}/karyawan/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };
    const payload = {
      ...karyawan,
      jabatan,
      potongan: [...potongans],
      absensi,
    };

    http.privateHTTP
      .post(url, payload, config)
      .then((response) => {
        message.success(response);
        // message.confirm("Cetak Struk", 'Apakah ingin mencetak struk', () => {
        //   navigate('/terima/print', {state: response.data})
        // })
        callback();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
  };

  const onItemRemove = (potongan) => {
    const temps = potongans.filter((value) => value._id !== potongan._id);
    daftarPotongans(temps);
  };

  // const onItemRemovee = (jabatan) => {
  //   const temps = jabatans.filter((value) => value._id !== jabatan._id);
  //   setdaftarJabatans(temps);
  // };

  return (
    <>
      <Button onClick={handleShow}>Karyawan</Button>

      <Modal
        show={show}
        onHide={handleClose}
        size={"xl"}
        backdrop={"static"}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className={"mb-3"}>
                <Form.Label>NIK Karyawan</Form.Label>
                <Form.Control
                  name={"nik"}
                  value={karyawan.nik}
                  onChange={(e) =>
                    changeListener.onChangeText(e, karyawan, setKaryawan)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className={"mb-3"}>
                <Form.Label>Telepon Karyawan</Form.Label>
                <Form.Control
                  name={"no_Telepon"}
                  value={karyawan.no_Telepon}
                  onChange={(e) =>
                    changeListener.onChangeNumber(e, karyawan, setKaryawan)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className={"mb-3"}>
            <Form.Label>Nama Karyawan</Form.Label>
            <Form.Control
              name={"nama"}
              value={karyawan.nama}
              onChange={(e) =>
                changeListener.onChangeText(e, karyawan, setKaryawan)
              }
            />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as={"textarea"}
              name={"alamat"}
              value={karyawan.alamat}
              onChange={(e) =>
                changeListener.onChangeText(e, karyawan, setKaryawan)
              }
            />
          </Form.Group>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group className={"mb-3"}>
                <Form.Label>Bank</Form.Label>
                <Form.Control
                  name={"bank"}
                  value={karyawan.bank}
                  onChange={(e) =>
                    changeListener.onChangeText(e, karyawan, setKaryawan)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={8} className="mb-3">
              <Form.Group className={"mb-3"}>
                <Form.Label>Nomor Rekening</Form.Label>
                <Form.Control
                  name={"no_rekening"}
                  value={karyawan.no_rekening}
                  onChange={(e) =>
                    changeListener.onChangeNumber(e, karyawan, setKaryawan)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className={"mb-3"}>
                <Form.Label>Hadir</Form.Label>
                <Form.Control
                  name={"Hadir"}
                  value={absensi.Hadir}
                  onChange={(e) =>
                    changeListener.onChangeNumber(e, absensi, setAbsensi)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className={"mb-3"}>
                <Form.Label>Alpa</Form.Label>
                <Form.Control
                  name={"Alpa"}
                  value={absensi.Alpa}
                  onChange={(e) =>
                    changeListener.onChangeNumber(e, absensi, setAbsensi)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className={"mb-3"}>
                <Form.Label>Terlambat</Form.Label>
                <Form.Control
                  name={"Terlambat"}
                  value={absensi.Terlambat}
                  onChange={(e) =>
                    changeListener.onChangeNumber(e, absensi, setAbsensi)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <WidgetJabatanChoice callback={onCallbackJabatanChoice} />
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Col>Nama Jabatan : {jabatan.nama} </Col>
                  <Col>Gaji Pokok : {jabatan.gajiPokok} </Col>
                  <Col>Tunjangan : {jabatan.tunjangan} </Col>
                </Card.Body>
              </Card>
              {/* <Table striped={true} bordered={true} responsive={true}>
                <thead>
                <tr>
                  <th>Nama</th>
                  <th>Gaji Pokok</th>
                  <th>Tunjangan</th>
                </tr>
                </thead>
                <tbody>
                {jabatans.map((value, indexJabatan) => (
                  <tr key={indexJabatan}>
                    <td>{value.nama}</td>
                    <td>{value.gajiPokok}</td>
                    <td>{value.tunjangan}</td>
                    <td>
                      <Button size={"sm"} onClick={() => onItemRemovee(value)}>Hapus</Button>
                    </td>
                  </tr>
                ))}
                </tbody>
                </Table> */}
            </Col>
          </Row>
          {/* <Row>
              <Col md={6} className={"mb-3"}>
              <Form.Group className={"mb-3"}>
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
              name={"jabatan"}
              value={jabatan.nama}
              onChange={handleJabatanChange}
              readOnly
              />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group className={"mb-3"}>
              <Form.Label>Gaji Pokok</Form.Label>
              <Form.Control
                name={"gajiPokok"}
                value={jabatan.gajiPokok}
                onChange={onCallbackJabatanChoice}
                readOnly
              />
              </Form.Group>
              </Col>
            </Row> */}
          <Row>
            <Col>
              <WidgetPotonganChoice callback={onCallbackPotonganChoice} />
            </Col>
            <Col md={6}>
              <Table striped={true} bordered={true} responsive={true}>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Potongan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {potongans.map((value, index) => (
                    <tr key={index}>
                      <td>{value.nama}</td>
                      <td>
                        {value.isPercentage
                          ? value.potongan / 100
                          : value.potongan}
                      </td>
                      <td>
                        <Button size={"sm"} onClick={() => onItemRemove(value)}>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody>
                  {/* <tr>
                  <th>Berat</th>
                  <td>
                    <Form.Control
                      placeholder={"dalam Kg"}
                      value={terima.berat}
                      type={"number"}
                      name={"berat"}
                      onChange={(e) => changeListener.onChangeNumber(e, terima, setTerima)}
                    />
                  </td>
                </tr> */}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onKaryawanCreate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

WidgetKaryawanCreateModal.propTypes = {
  callback: PropTypes.func,
};

export default WidgetKaryawanCreateModal;
