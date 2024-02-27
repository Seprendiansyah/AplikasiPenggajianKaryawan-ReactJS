import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Barcode from "react-barcode";

const PagePenggajianPrint = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onBluetoothVSCConnect = () => {
    var SERVICE = "000018f0-0000-1000-8000-00805f9b34fb";
    var WRITE = "00002af1-0000-1000-8000-00805f9b34fb";

    var DATA =
      "" +
      // center align
      "\x1B" +
      "\x61" +
      "\x31" +
      // double font size
      "\x1D" +
      "\x21" +
      "\x11" +
      "Uhuy\nCorporation!\n\n" +
      // normal font size
      "\x1D" +
      "\x21" +
      "\x00" +
      `${location.state.nomor}\nat ${location.state.pelanggan.nama}` +
      "\x1D" +
      "\x21" +
      "\x00" +
      `${location.state.pelanggan.telepon}` +
      "\n\n\n\n\n\n\n"; // feed paper

    var deviceHandle;
    navigator.bluetooth
      .requestDevice({ filters: [{ services: [SERVICE] }] })
      .then((device) => {
        console.log(device);
        deviceHandle = device;
        return device.gatt.connect();
      })
      .then((server) => {
        console.log(server);
        return server.getPrimaryService(SERVICE);
      })
      .then((service) => {
        console.log(service);
        return service.getCharacteristic(WRITE);
      })
      .then((channel) => {
        console.log(channel);
        return channel.writeValue(new TextEncoder("utf-8").encode(DATA));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        deviceHandle.gatt.disconnect();
      }); // center align + '\x1D' + '\x21' + '\x11' + 'Hello\nBluetooth!\n\n'                    // double font size + '\x1D' + '\x21' + '\x00' + '... from your friends\nat https://qz.io'  // normal font size + '\n\n\n\n\n\n\n';                                                     // feed paper var deviceHandle; navigator.bluetooth.requestDevice({ filters: [{ services: [SERVICE]}] }).then(device => { console.log(device); deviceHandle = device; return device.gatt.connect() }).then(server => { console.log(server); return server.getPrimaryService(SERVICE); }).then(service => { console.log(service); return service.getCharacteristic(WRITE); }).then(channel => { console.log(channel); return channel.writeValue(new TextEncoder("utf-8").encode(DATA)); }).catch(error => { console.error(error) }).finally(() => { deviceHandle.gatt.disconnect(); });
  };

  return (
    <>
      <Container className={"mt-4 mb-4"} fluid={true}>
        <h1 className={"display-6 mb-4"}>Bukti Transaski</h1>
        <Row className={"mb-3"}>
          <Col className={"d-flex justify-content-end"}>
            <Barcode value={location.state.nik} />;
          </Col>
        </Row>
        <Row className={"mb-3"}>
          <Col>
            <Table borderless={true}>
              <tbody>
                <tr>
                  <th>Nomor Transaksi</th>
                  <td>{location.state.nik}</td>
                </tr>
                <tr>
                  <th>Tanggal Transaksi</th>
                  <td>{location.state.tanggal}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{location.state.status.toUpperCase()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table borderless={true}>
              <tbody>
                <tr>
                  <th>Nama Karyawan</th>
                  <td>{location.state.penggajian.nama}</td>
                </tr>
                <tr>
                  <th>Jabatan</th>
                  <td>{location.state.penggajian.jabatan.nama}</td>
                </tr>
                <tr>
                  <th>Departemen</th>
                  <td>{location.state.departemen.nama}</td>
                </tr>
                <tr>
                  <th>Gaji Bersih</th>
                  <td>{location.state.penggajian.totalGaji}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* <Row className={"mb-3"}>
          <Col>
            <Table borderless={true} striped={true}>
              <thead>
              <tr>
                <th>Nama</th>
              </tr>
              </thead>
              <tbody>
              {location.state.items.map((value) => (
                <tr key={value._id}>
                  <td>{value.nama}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className={"mb-3"}>
          <Col md={6}>
            <Table>
              <tbody>
              <tr>
                <th>Berat</th>
                <td>{location.state.berat}Kg</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>{location.state.total}</td>
              </tr>
              <tr>
                <th>Uang Muka/Dibayar</th>
                <td>{location.state.uangMuka}</td>
              </tr>
              <tr>
                <th>Sisa</th>
                <td>{location.state.sisa}</td>
              </tr>
              </tbody>
            </Table>
          </Col>
        </Row> */}
        <Row>
          <Col className={"d-flex justify-content-center gap-3"}>
            <Button
              className={"d-print-none"}
              onClick={() => navigate("/penggajian")}
            >
              Back
            </Button>
            <Button className={"d-print-none"} onClick={onBluetoothVSCConnect}>
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PagePenggajianPrint;
