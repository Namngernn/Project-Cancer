import { AxiosClient } from '../apiClient';
//บันทึกผลข้างเคียง
export async function createFeedbackHN(hn, patientSideEffect, sendAt) {
    return AxiosClient.post(`/feedback/${hn}`, {
        sideEffect: patientSideEffect,
        date: sendAt,
    });
}

//ดึงมาหน้าประวัติผลข้างเคียง
export async function getSelectedFeedback(appointId){
    return AxiosClient.get(`/selectedFeedback/${appointId}`)
}