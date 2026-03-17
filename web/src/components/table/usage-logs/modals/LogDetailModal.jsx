import React from 'react';
import {
  Modal,
  Button,
  Empty,
  Spin,
  Typography,
} from '@douyinfe/semi-ui';
import { IconCopy } from '@douyinfe/semi-icons';
import { copy, showError, showSuccess } from '../../../../helpers';

const { Text, Paragraph } = Typography;

const LogDetailModal = ({
  showLogDetailModal,
  setShowLogDetailModal,
  logDetailData,
  loadingLogDetail,
  t,
}) => {
  const copyContent = async (content) => {
    if (!content) return;
    if (await copy(content)) {
      showSuccess(t('已复制'));
    } else {
      showError(t('无法复制到剪贴板，请手动复制'));
    }
  };

  const formatJson = (str) => {
    if (!str) return '';
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch {
      return str;
    }
  };

  return (
    <Modal
      title={t('请求内容详情')}
      visible={showLogDetailModal}
      onCancel={() => setShowLogDetailModal(false)}
      footer={null}
      centered
      closable
      maskClosable
      width={720}
    >
      <Spin spinning={loadingLogDetail}>
        <div style={{ padding: '8px 20px 20px' }}>
          {!logDetailData ? (
            <Empty
              description={t('暂无请求内容记录')}
              style={{ padding: '24px 0 8px' }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              {logDetailData.request_body && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Text strong>{t('请求体')}</Text>
                    <Button
                      icon={<IconCopy />}
                      theme='borderless'
                      type='tertiary'
                      size='small'
                      onClick={() => copyContent(logDetailData.request_body)}
                    >
                      {t('复制')}
                    </Button>
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid var(--semi-color-border)',
                      background: 'var(--semi-color-fill-0)',
                      maxHeight: '50vh',
                      overflowY: 'auto',
                    }}
                  >
                    <Paragraph
                      style={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                        fontSize: 12,
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                      }}
                    >
                      {formatJson(logDetailData.request_body)}
                    </Paragraph>
                  </div>
                </div>
              )}
              {logDetailData.response_body && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Text strong>{t('响应体')}</Text>
                    <Button
                      icon={<IconCopy />}
                      theme='borderless'
                      type='tertiary'
                      size='small'
                      onClick={() => copyContent(logDetailData.response_body)}
                    >
                      {t('复制')}
                    </Button>
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid var(--semi-color-border)',
                      background: 'var(--semi-color-fill-0)',
                      maxHeight: '50vh',
                      overflowY: 'auto',
                    }}
                  >
                    <Paragraph
                      style={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                        fontSize: 12,
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                      }}
                    >
                      {formatJson(logDetailData.response_body)}
                    </Paragraph>
                  </div>
                </div>
              )}
              {!logDetailData.request_body && !logDetailData.response_body && (
                <Empty
                  description={t('暂无请求内容记录')}
                  style={{ padding: '24px 0 8px' }}
                />
              )}
            </div>
          )}
        </div>
      </Spin>
    </Modal>
  );
};

export default LogDetailModal;
