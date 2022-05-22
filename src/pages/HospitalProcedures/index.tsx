import { HospitalProcedure } from "@prisma/client"
import { Card, Col, Row, Select, Space, Table } from "antd"
import type { NextPage } from "next"
import { useCallback, useEffect, useState } from "react"
import { hospitalProceduresColumnDefinitions } from "../../components/ListHospitalProcedures/HospitalProceduresTableConfig"
import { listHospitalProcedures } from "../../services/client/ListHospitalProcedures"
import {
  serverListDistinctCPTCodes,
  serverListDistinctHospitalNames,
  serverListHospitalProcedures,
} from "../../services/server/ServerListHospitalProcedures"

type HospitalProceduresProps = {
  hospitalProcedures: HospitalProcedure[]
  cptCodes: number[]
  hospitalNames: string[]
}

export const getStaticProps = async (): Promise<{
  props: HospitalProceduresProps
}> => {
  const hospitalProcedures = await serverListHospitalProcedures()
  const cptCodes = await serverListDistinctCPTCodes()
  const hospitalNames = await serverListDistinctHospitalNames()
  return {
    props: {
      hospitalProcedures,
      cptCodes,
      hospitalNames,
    },
  }
}

const HospitalProcedures: NextPage<HospitalProceduresProps> = (props) => {
  const [hospitalProcedures, setHospitalProcedures] = useState(
    props.hospitalProcedures
  )
  const hospitalNames = [...props.hospitalNames]
  const cptCodes = [...props.cptCodes]

  const [selectedHospitalNames, setSelectedHospitalNames] = useState<
    Set<string>
  >(new Set())
  const [selectedCptCodes, setSelectedCptCodes] = useState<Set<number>>(
    new Set()
  )

  const fetchHospitalProcedures = useCallback(
    (cptCodes: number[], hospitalNames: string[]) => {
      const fetchData = async () => {
        const data = await listHospitalProcedures(cptCodes, hospitalNames)
        setHospitalProcedures(data)
      }
      fetchData()
    },
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      await fetchHospitalProcedures(
        Array.from(selectedCptCodes),
        Array.from(selectedHospitalNames)
      )
    }
    fetchData()
  }, [fetchHospitalProcedures, selectedCptCodes, selectedHospitalNames])

  return (
    <Row>
      <Space align="center" direction="horizontal" size={[100, 0]}>
        <Card
          title={
            <Space direction="vertical" size={[1, 10]}>
              <h2>
                Hospital procedures
                <span className="counter">{` (${hospitalProcedures.length})`}</span>{" "}
              </h2>
              <small>
                The data is presented as reported by the hospitals without
                further confirmation and might be inaccurate.{" "}
              </small>

              <Row>
                <Col span={12}>
                  <Select
                    placeholder="Search CPT Codes..."
                    showSearch
                    mode="multiple"
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      setSelectedCptCodes(new Set([...value]))
                    }
                  >
                    {cptCodes
                      .filter((item) => !selectedCptCodes.has(item))
                      .map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>

                <Col span={12}>
                  <Select
                    placeholder="Search hospitals..."
                    showSearch
                    mode="multiple"
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setSelectedHospitalNames(new Set([...value]))
                    }}
                  >
                    {hospitalNames
                      .filter((item) => !selectedHospitalNames.has(item))
                      .map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              </Row>
            </Space>
          }
          bordered
        >
          <Table
            dataSource={hospitalProcedures}
            columns={hospitalProceduresColumnDefinitions}
            rowKey={"id"}
          />
        </Card>
      </Space>
    </Row>
  )
}
export default HospitalProcedures
