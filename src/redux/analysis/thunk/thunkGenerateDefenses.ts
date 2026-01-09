import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";



type DefendantPosition = {
    defendantName: string | null;
    positionSummary: string | null;
};

type EvidenceItem = {
    source: string | null;
    proves: string | null;
    doesNotProve: string | null;
    limitations: string | null;
};

type PotentialLegalCharacterization = {
    chargeDescription: string | null;
    elementsReliedUpon: string[];
    elementsLackingProof: string[];
};

type LegalAnalysis = {
    caseType: string | null;
    caseNumber: string | null;
    courtName: string | null;

    legalFactsSummary: string[];

    defendantsPositions: DefendantPosition[];

    evidenceMap: EvidenceItem[];

    legalAndTechnicalReviewPoints: string[];

    potentialLegalCharacterization: PotentialLegalCharacterization;
};

type TPropsData = {
    caseId: string;
    caseFacts: string | null;
    legalAnalysis: LegalAnalysis;
}

const thunkGenerateDefenses = createAsyncThunk('analysis/thunkGenerateDefenses', async ({ caseId, caseFacts, legalAnalysis }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post(`SmartAnalysis/generate-defenses`, {
            caseId,
            caseFacts,
            legalAnalysis,
        });
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    };
});

export default thunkGenerateDefenses;