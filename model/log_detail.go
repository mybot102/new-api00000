package model

import (
	"github.com/QuantumNous/new-api/common"
)

type LogDetail struct {
	Id           int    `json:"id" gorm:"primaryKey"`
	LogId        int    `json:"log_id" gorm:"uniqueIndex"`
	RequestBody  string `json:"request_body" gorm:"type:text"`
	ResponseBody string `json:"response_body" gorm:"type:text"`
	CreatedAt    int64  `json:"created_at"`
}

func CreateLogDetail(logId int, requestBody string, responseBody string) error {
	detail := &LogDetail{
		LogId:        logId,
		RequestBody:  requestBody,
		ResponseBody: responseBody,
		CreatedAt:    common.GetTimestamp(),
	}
	return LOG_DB.Create(detail).Error
}

func GetLogDetailByLogId(logId int) (*LogDetail, error) {
	var detail LogDetail
	err := LOG_DB.Where("log_id = ?", logId).First(&detail).Error
	if err != nil {
		return nil, err
	}
	return &detail, nil
}

func DeleteLogDetailsByTimestamp(targetTimestamp int64) error {
	subQuery := LOG_DB.Model(&Log{}).Select("id").Where("created_at < ?", targetTimestamp)
	return LOG_DB.Where("log_id IN (?)", subQuery).Delete(&LogDetail{}).Error
}
