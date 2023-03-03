import { HospitalProcedure } from "@prisma/client"
import { TableColumnsType } from "antd"
import { getDefaultCompareFn } from "../../utils/TableUtils"

export const hospitalProceduresColumnDefinitions: TableColumnsType<HospitalProcedure> =
  [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "right",
      width: 120,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Hospital Name",
      dataIndex: "hospital_name",
      key: "hospital_name",
      width: 320,
      sorter: getDefaultCompareFn("hospital_name"),
    },
    {
      title: "CPT Code",
      dataIndex: "cpt_code",
      key: "cpt_code",
      align: "right",
      width: 120,
      sorter: getDefaultCompareFn("cpt_code"),
    },
    {
      title: "Procedure Name",
      dataIndex: "procedure_name",
      key: "procedure_name",
      width: 320,
      sorter: getDefaultCompareFn("procedure_name"),
    },
    {
      title: "Average charge",
      dataIndex: "average_charge",
      key: "average_charge",
      width: 120,
      align: "right",
      render: (data) => (
        <span className="ralign">{`$${Math.ceil(data / 100 || 0)}`}</span>
      ),
      sorter: (a, b) =>
        (a.average_charge || Number.NEGATIVE_INFINITY) -
        (b.average_charge || Number.NEGATIVE_INFINITY),
      defaultSortOrder: "descend",
    },
  ]
