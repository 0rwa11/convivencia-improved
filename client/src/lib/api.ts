/**
 * API Service Module
 * Handles all communication with the backend server for data persistence
 */

const API_BASE = "/api/data";

export interface Evaluation {
  id?: string;
  [key: string]: any;
}

export interface Group {
  id?: string;
  [key: string]: any;
}

/**
 * Fetch all data from the server
 */
export async function getAllData() {
  try {
    const response = await fetch(`${API_BASE}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { evaluations: [], groups: [], sessions: [] };
  }
}

/**
 * Fetch all evaluations
 */
export async function getEvaluations(): Promise<Evaluation[]> {
  try {
    const response = await fetch(`${API_BASE}/evaluations`);
    if (!response.ok) throw new Error("Failed to fetch evaluations");
    return await response.json();
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    return [];
  }
}

/**
 * Save a new evaluation
 */
export async function saveEvaluation(evaluation: Evaluation): Promise<Evaluation | null> {
  try {
    const response = await fetch(`${API_BASE}/evaluations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evaluation),
    });
    if (!response.ok) throw new Error("Failed to save evaluation");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error saving evaluation:", error);
    return null;
  }
}

/**
 * Update an existing evaluation
 */
export async function updateEvaluation(id: string, evaluation: Evaluation): Promise<Evaluation | null> {
  try {
    const response = await fetch(`${API_BASE}/evaluations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evaluation),
    });
    if (!response.ok) throw new Error("Failed to update evaluation");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error updating evaluation:", error);
    return null;
  }
}

/**
 * Delete an evaluation
 */
export async function deleteEvaluation(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/evaluations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete evaluation");
    return true;
  } catch (error) {
    console.error("Error deleting evaluation:", error);
    return false;
  }
}

/**
 * Fetch all groups
 */
export async function getGroups(): Promise<Group[]> {
  try {
    const response = await fetch(`${API_BASE}/groups`);
    if (!response.ok) throw new Error("Failed to fetch groups");
    return await response.json();
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
}

/**
 * Save a new group
 */
export async function saveGroup(group: Group): Promise<Group | null> {
  try {
    const response = await fetch(`${API_BASE}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group),
    });
    if (!response.ok) throw new Error("Failed to save group");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error saving group:", error);
    return null;
  }
}
