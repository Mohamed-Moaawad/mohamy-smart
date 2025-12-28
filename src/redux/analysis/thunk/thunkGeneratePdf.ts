import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    caseId: string;
    factsAndClassificationText: string;
    defenses: {
        title: string;
        detailsText: string;
    }[];
    finalRequestsText: string[];
}

const thunkGeneratePdf = createAsyncThunk('analysis/thunkGeneratePdf', async ({ caseId, defenses, factsAndClassificationText, finalRequestsText }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const payload = {
            caseId,
            factsAndClassificationText,
            defenses,
            finalRequestsText,
        };

        const res = await api.post(`SmartAnalysis/generate-pdf`,
            payload,
            { responseType: 'blob' }
        );
        // حوّل Blob إلى Base64
        const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(res.data);
        });

        return base64;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGeneratePdf;