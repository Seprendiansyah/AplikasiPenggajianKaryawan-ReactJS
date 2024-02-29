import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Barcode from "react-barcode";

const PagePenggajianPrint = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const data = location.state.karyawanref;
    const jumlahPotonganAbsensi = (alpa, terlambat) => {
        const jumlah = alpa + terlambat;
        return jumlah;
    }
    const hitungTotalPajak = (data) => {
        let total = 0;
        data.potongan.forEach((item) => {
            total += item.jumlah;
        });
        return total;
    };
    const totalPotongan = (absensi, pajak) => {
        const jumlah = absensi + pajak;
        return jumlah;
    };
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
                        <Barcode value={data._id} />;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* <Table borderless={true}>
                            <tr>
                                <th>Nama</th>
                                <td>{data.nama}</td>
                            </tr>
                        </Table> */}
                        <h3 className="mb-4">Profil Karyawan</h3>
                        <Table borderless={true} >
                            <tbody>
                                <tr>
                                    <th>Nama</th>
                                    <td>{data.nama}</td>
                                </tr>
                                <tr>
                                    <th>NIK</th>
                                    <td>{data.nik}</td>
                                </tr>
                                <tr>
                                    <th>Jabatan</th>
                                    <td>{data.jabatan.nama}</td>
                                </tr>
                                <tr>
                                    <th>Departemen</th>
                                    <td>IT belum diaplikasikan</td>
                                </tr>
                                <tr>
                                    <th>Gaji</th>
                                    <td>{data.jabatan.gajiPokok}</td>
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
                                {data.potongan.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.nama} {item.potongan}%</th>
                                        <td>{item.jumlahpotongan}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <th>Absensi</th>
                                    <td>{jumlahPotonganAbsensi(data.absensi.nominalAlpa, data.absensi.nominalTerlambat)}</td>
                                </tr>
                            </tbody>

                        </Table>
                        <Table>
                            <tbody >
                                <tr>
                                    <th>Total Potongan</th>
                                    <td>135000</td>

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
                                    <td>{data.jabatan.tunjangan}</td>
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
                                    <td>10665000 </td>

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
