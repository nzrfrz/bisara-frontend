import { Modal, Tag } from "antd";
import { useContext } from "react";
import { PrivateDictContext } from "./privateDictContext/privateDictContextCreate";
import { toTitleCase } from "../../../modules";
import { FormItemBasicInput, FormItemSubmitButton, FormItemTextArea, FormItemWrapper } from "../../../components";

export const PrivateDictModalDetail = () => {
  const {
    form,
    onFinishForm,
    corpusType,
    dictDetailModalOpen,
    setDictDetailModalOpen
  } = useContext(PrivateDictContext);

  const onCancel = () => {
    form?.resetFields();
    setDictDetailModalOpen && setDictDetailModalOpen(!dictDetailModalOpen)
  };

  return (
    <Modal
      title={`Korpus ${toTitleCase(corpusType)} Detail`}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={dictDetailModalOpen}
      onOk={() => setDictDetailModalOpen && setDictDetailModalOpen(!dictDetailModalOpen)}
      onCancel={onCancel}
      footer={[]}
    >
      <div style={{ marginTop: 16 }}>
        <FormItemWrapper form={form} onFinishForm={onFinishForm}>
          <FormItemBasicInput 
            name="indonesia"
            label='Indonesia'
          />
          <FormItemTextArea 
            name={corpusType}
            label={toTitleCase(corpusType)}
          />
          <div style={{ paddingTop: 4, display: 'flex', gap: 8 }}>
            <span>Status:</span>
            <Tag color="lime">VALID</Tag>
          </div>
          <div>
            <FormItemSubmitButton />
          </div>
        </FormItemWrapper>
      </div>
    </Modal>
  );
};