import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Barcode from "react-barcode";

const PagePenggajianPrint = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const jumlahPotonganAbsensi = (alpa, terlambat) => {
        const jumlah = alpa + terlambat;
        return jumlah;
    }
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
      `${data.nomor}\nat ${data}` +
      "\x1D" +
      "\x21" +
      "\x00" +
      `${data}` +
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
                <h1 className={"display-6 mb-4"}>Slip Gaji</h1>
                <h5>Periode bulan : Januari </h5>
                <Row className={"mb-3"}>
                    <Col className={"d-flex justify-content-end"}>
                        <Barcode value={data.karyawanref._id} />;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* <Table borderless={true}>
                            <tr>
                                <th>Nama</th>
                                <td>{data.karyawanref.nama}</td>
                            </tr>
                        </Table> */}
                        <h3 className="mb-4">Profil Karyawan</h3>
                        <Table borderless={true} >
                            <tbody>
                                <tr>
                                    <th>Nama</th>
                                    <td>{data.karyawanref.nama}</td>
                                </tr>
                                <tr>
                                    <th>NIK</th>
                                    <td>{data.karyawanref.nik}</td>
                                </tr>
                                <tr>
                                    <th>Jabatan</th>
                                    <td>{data.karyawanref.jabatan.nama}</td>
                                </tr>
                                <tr>
                                    <th>Departemen</th>
                                    <td>{data.karyawanref.departemen.nama}</td>
                                </tr>
                                <tr>
                                    <th>Gaji</th>
                                    <td>{data.karyawanref.jabatan.gajiPokok}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <Table borderless={true}>
                            <tbody>
                                <h2>Potongan</h2>
                                <tr className="mb-4">
                                    <th>Pajak</th>
                                    <td></td>
                                </tr>
                                {data.karyawanref.potongan.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.nama} {item.potongan}%</th>
                                        <td>{item.jumlahpotongan}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <th>Absensi</th>
                                    <td>{data.karyawanref.absensi.jumlahpotonganAbsensi}</td>
                                </tr>
                            </tbody>

                        </Table>
                        <Table>
                            <tbody >
                                <tr>
                                    <th>Total Potongan</th>
                                    <td>{data.totalPotongan}</td>

                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table borderless={true}>
                            <tbody>
                                <h2>Tunjangan</h2>

                                <tr>
                                    <th>Tunjangan jabatan</th>
                                    <td>{data.karyawanref.jabatan.tunjangan}</td>
                                </tr>
                                <tr>
                                    <th>Tunjangan Departemen</th>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <th>Tunjangan Keluarga</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Tunjangan Lain lain</th>
                                    <td>0</td>
                                </tr>
                                
                            </tbody>
                        </Table>
                        <Table>
                            <tbody >
                                <tr>
                                    <th>Total Gaji Bersih</th>
                                    <td>{data.totalGaji} </td>

                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
               
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
