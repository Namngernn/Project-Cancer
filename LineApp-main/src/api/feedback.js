import { AxiosClient } from "../apiClient";

export async function createFeedbackHNAppoint_no(hn, appointNo, sideEffect, date) {
    return AxiosClient.post(`/feedback/${hn}/${appointNo}`, {
        sideEffect,
        date
    });
  }

export async function getFeedbacks(hn){
    return AxiosClient.get(`/feedback/${hn}`)
}

export async function getSelectedFeedback(appointId){
    return AxiosClient.get(`/selectedFeedback/${appointId}`)
}