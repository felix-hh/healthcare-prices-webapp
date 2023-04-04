import { Card, Space, Input, Button } from "antd"
import { useState } from "react"
import { proceduresFromPrompt } from "../../services/client/ProceduresFromPrompt"
import { FC } from "react"

const { TextArea } = Input

type ProceduresFromPromptInputProps = Record<string, never>

export const ProceduresFromPromptInput: FC<
  ProceduresFromPromptInputProps
> = () => {
  // Add new state for the patient query and the fetched CPT codes
  const [patientQuery, setPatientQuery] = useState("")
  const [fetchedCptCodes, setFetchedCptCodes] = useState<string[]>([])

  // Create a function to handle the submission of the patient query
  const handleSubmitPatientQuery = async () => {
    const apiResponse = await proceduresFromPrompt(patientQuery)
    const cptCodes = apiResponse.split("\n")
    setFetchedCptCodes(cptCodes)
  }

  return (
    <>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <TextArea
            value={patientQuery}
            onChange={(e) => setPatientQuery(e.target.value)}
            placeholder="Search for relevant CPT codes..."
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
          <Button onClick={handleSubmitPatientQuery} type="primary">
            Submit Query
          </Button>
        </Space>
      </Card>

      {/* Display the fetched CPT codes */}
      <Card title="Relevant CPT Codes">
        {fetchedCptCodes.length > 0 ? (
          <ul>
            {fetchedCptCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        ) : (
          <p>No CPT codes fetched yet.</p>
        )}
      </Card>
    </>
  )
}
