import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import { useEffect, useRef, useState } from "react";
import useMessage from "../../libs/hooks/useMessage.jsx";
import { BASE_URL } from "../../libs/config/settings.js";
import useURLResolver from "../../libs/hooks/useURLResolver.jsx";
import { Link, useNavigate } from "react-router-dom";
import WidgetKaryawanCreateModal from "../../../widget/karyawan/WidgetKaryawanCreateModal.jsx";
import PagePenggajianPrint from "./PagePenggajianPrint.jsx";

const PagePenggajianList = () => {
  const navigate = useNavigate();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const [daftarPenggajian, setDaftarPenggajian] = useState([]);
  const [daftarPenggajianPagination, setDaftarPenggajianPagination] = useState(
    {}
  );
  const penggajianSearch = useRef({ value: "" });

  const onPenggajianList = (params) => {
    const url = `${BASE_URL}/penggajian/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        setDaftarPenggajianPagination(pagination);
        setDaftarPenggajian(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onPenggajianSearch = (e) => {
    if (e.key == "Enter") {
      onPenggajianList({ search: penggajianSearch.current.value });
    }
  };

  const onPenggajianPagination = (page) => {
    onPenggajianList({ search: penggajianSearch.current.value, page });
  };

  const onPenggajianPrint = useEffect(() => {
    onPenggajianList();
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar Karyawan</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            {/* <Button onClick={() => navigate("potongan")}>Penggajian</Button> */}
          </Col>
        </Row>
        <Row className={"mb-4"}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        ref={penggajianSearch}
                        onKeyDown={onPenggajianSearch}
                        placeholder={"Search..."}
                        className={"w-50 bg-body-tertiary"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Table responsive={true} striped={true} borderless={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Jabatan</th>
                    <th>Departemen</th>
                    <th>Gaji Bersih</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {daftarPenggajian.map((value) => (
                    <tr key={value._id}>
                      <td>
                        <Link
                          to={`/penggajian/detail/${value._id}`}
                          className={"text-decoration-none"}
                        >
                          {value._id}
                        </Link>
                      </td>
                      <td>{value.nik}</td>
                      <td>{value.nama}</td>
                      <td>{value.jabatan.nama}</td>
                      <td>{value.departemen.nama}</td>
                      <td>{value.totalGaji}</td>
                      {/* <td>
                        <Button onClick={() => navigate("print")}>Print</Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Card.Footer>
                <Pagination>
                  <Pagination.First
                    disabled={!daftarPenggajianPagination.previous}
                    onClick={() => onPenggajianPagination(1)}
                  />
                  {daftarPenggajianPagination?.pages?.map((page) => (
                    <Pagination.Item
                      onClick={() => onPenggajianPagination(page.page)}
                      key={page.page}
                    >
                      {page.page}
                    </Pagination.Item>
                  ))}
                  <Pagination.Last
                    disabled={!daftarPenggajianPagination.next}
                    onClick={() =>
                      onPenggajianPagination(
                        daftarPenggajianPagination.totalPage
                      )
                    }
                  />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PagePenggajianList;
