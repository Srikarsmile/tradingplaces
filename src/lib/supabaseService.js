import { supabase } from "./supabaseClient";

/**
 * User Profile Service
 */
export const userProfileService = {
  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} User profile or null
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" - that's okay
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  },

  /**
   * Create or update user profile
   * @param {string} userId - User ID
   * @param {Object} profileData - Profile data (username, date_of_birth)
   * @returns {Promise<Object>} Created/updated profile
   */
  async upsertProfile(userId, profileData) {
    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Error upserting user profile:", error);
      throw error;
    }

    return data;
  },
};

/**
 * Practice Session Service
 */
export const practiceSessionService = {
  /**
   * Create a new practice session
   * @param {string} userId - User ID
   * @param {Object} sessionData - Session data
   * @returns {Promise<Object>} Created session
   */
  async createSession(userId, sessionData) {
    const { data, error } = await supabase
      .from("practice_sessions")
      .insert({
        user_id: userId,
        selected_scenario_id: sessionData.selectedScenarioId,
        notes: sessionData.notes || null,
        learnings: sessionData.learnings || [],
        improvement_tips: sessionData.improvementTips || [],
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating practice session:", error);
      throw error;
    }

    return data;
  },

  /**
   * Get all sessions for a user
   * @param {string} userId - User ID
   * @param {number} limit - Number of sessions to return
   * @returns {Promise<Array>} Array of sessions
   */
  async getUserSessions(userId, limit = 50) {
    const { data, error } = await supabase
      .from("practice_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching user sessions:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get a single session by ID
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object|null>} Session or null
   */
  async getSession(sessionId) {
    const { data, error } = await supabase
      .from("practice_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (error) {
      console.error("Error fetching session:", error);
      return null;
    }

    return data;
  },

  /**
   * Update a practice session
   * @param {string} sessionId - Session ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated session
   */
  async updateSession(sessionId, updates) {
    const { data, error } = await supabase
      .from("practice_sessions")
      .update(updates)
      .eq("id", sessionId)
      .select()
      .single();

    if (error) {
      console.error("Error updating session:", error);
      throw error;
    }

    return data;
  },

  /**
   * Delete a practice session
   * @param {string} sessionId - Session ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteSession(sessionId) {
    const { error } = await supabase
      .from("practice_sessions")
      .delete()
      .eq("id", sessionId);

    if (error) {
      console.error("Error deleting session:", error);
      throw error;
    }

    return true;
  },
};

/**
 * Scenario Snapshot Service
 */
export const scenarioSnapshotService = {
  /**
   * Create a scenario snapshot
   * @param {string} sessionId - Practice session ID
   * @param {Object} snapshotData - Snapshot data
   * @returns {Promise<Object>} Created snapshot
   */
  async createSnapshot(sessionId, snapshotData) {
    const { data, error } = await supabase
      .from("scenario_snapshots")
      .insert({
        practice_session_id: sessionId,
        scenario_id: snapshotData.id,
        scenario_title: snapshotData.title,
        empathy_focus: snapshotData.empathyFocus || [],
        customer_score: snapshotData.scores?.customer || null,
        manager_score: snapshotData.scores?.manager || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating scenario snapshot:", error);
      throw error;
    }

    return data;
  },

  /**
   * Get snapshots for a session
   * @param {string} sessionId - Practice session ID
   * @returns {Promise<Array>} Array of snapshots
   */
  async getSessionSnapshots(sessionId) {
    const { data, error } = await supabase
      .from("scenario_snapshots")
      .select("*")
      .eq("practice_session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching snapshots:", error);
      throw error;
    }

    return data || [];
  },
};

/**
 * Dialogue Practice Service
 */
export const dialoguePracticeService = {
  /**
   * Create a dialogue practice
   * @param {string} sessionId - Practice session ID
   * @param {Object} dialogueData - Dialogue data
   * @returns {Promise<Object>} Created dialogue practice
   */
  async createPractice(sessionId, dialogueData) {
    const { data, error } = await supabase
      .from("dialogue_practices")
      .insert({
        practice_session_id: sessionId,
        dialogue_id: dialogueData.id,
        dialogue_title: dialogueData.title,
        connection_score: dialogueData.connectionScore || null,
        understanding_score: dialogueData.metrics?.Understanding || null,
        empathy_signaled_score: dialogueData.metrics?.["Empathy signaled"] || null,
        clarity_score: dialogueData.metrics?.["Clarity of next steps"] || null,
        completed_lines: dialogueData.completion?.completed || 0,
        total_lines: dialogueData.completion?.total || 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating dialogue practice:", error);
      throw error;
    }

    return data;
  },

  /**
   * Update a dialogue practice
   * @param {string} practiceId - Dialogue practice ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated practice
   */
  async updatePractice(practiceId, updates) {
    const { data, error } = await supabase
      .from("dialogue_practices")
      .update(updates)
      .eq("id", practiceId)
      .select()
      .single();

    if (error) {
      console.error("Error updating dialogue practice:", error);
      throw error;
    }

    return data;
  },

  /**
   * Get dialogue practice for a session
   * @param {string} sessionId - Practice session ID
   * @returns {Promise<Object|null>} Dialogue practice or null
   */
  async getSessionPractice(sessionId) {
    const { data, error } = await supabase
      .from("dialogue_practices")
      .select("*")
      .eq("practice_session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching dialogue practice:", error);
      return null;
    }

    return data;
  },
};

/**
 * Dialogue Choice Service
 */
export const dialogueChoiceService = {
  /**
   * Create dialogue choices (bulk insert)
   * @param {string} practiceId - Dialogue practice ID
   * @param {Array} choices - Array of choice objects
   * @returns {Promise<Array>} Created choices
   */
  async createChoices(practiceId, choices) {
    if (!choices || choices.length === 0) {
      return [];
    }

    const choicesToInsert = choices.map((choice) => ({
      dialogue_practice_id: practiceId,
      line_number: choice.lineNumber,
      speaker: choice.speaker,
      prompt: choice.prompt || null,
      selected_option: choice.selected,
      understanding_effect: choice.effect?.Understanding || 0,
      empathy_effect: choice.effect?.["Empathy signaled"] || 0,
      clarity_effect: choice.effect?.["Clarity of next steps"] || 0,
    }));

    const { data, error } = await supabase
      .from("dialogue_choices")
      .insert(choicesToInsert)
      .select();

    if (error) {
      console.error("Error creating dialogue choices:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get choices for a dialogue practice
   * @param {string} practiceId - Dialogue practice ID
   * @returns {Promise<Array>} Array of choices
   */
  async getPracticeChoices(practiceId) {
    const { data, error } = await supabase
      .from("dialogue_choices")
      .select("*")
      .eq("dialogue_practice_id", practiceId)
      .order("line_number", { ascending: true });

    if (error) {
      console.error("Error fetching dialogue choices:", error);
      throw error;
    }

    return data || [];
  },
};

/**
 * Complete Session Service
 * Saves an entire practice session with all related data
 */
export const completeSessionService = {
  /**
   * Save a complete practice session
   * @param {string} userId - User ID
   * @param {Object} sessionData - Complete session data (matches localStorage structure)
   * @returns {Promise<Object>} Saved session with all related data
   */
  async saveCompleteSession(userId, sessionData) {
    try {
      // 1. Create practice session
      const session = await practiceSessionService.createSession(userId, {
        selectedScenarioId: sessionData.selectedScenarioId,
        notes: sessionData.notes || "",
        learnings: sessionData.learnings || [],
        improvementTips: sessionData.improvementTips || [],
      });

      // 2. Create scenario snapshots
      if (sessionData.scenarioSnapshots && sessionData.scenarioSnapshots.length > 0) {
        for (const snapshot of sessionData.scenarioSnapshots) {
          await scenarioSnapshotService.createSnapshot(session.id, snapshot);
        }
      }

      // 3. Create dialogue practice
      if (sessionData.dialogue) {
        const dialoguePractice = await dialoguePracticeService.createPractice(
          session.id,
          sessionData.dialogue
        );

        // 4. Create dialogue choices
        if (sessionData.dialogue.choices && sessionData.dialogue.choices.length > 0) {
          await dialogueChoiceService.createChoices(
            dialoguePractice.id,
            sessionData.dialogue.choices
          );
        }
      }

      return session;
    } catch (error) {
      console.error("Error saving complete session:", error);
      throw error;
    }
  },

  /**
   * Load a complete session (reconstructs localStorage format)
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object>} Complete session data
   */
  async loadCompleteSession(sessionId) {
    try {
      const session = await practiceSessionService.getSession(sessionId);
      if (!session) return null;

      const snapshots = await scenarioSnapshotService.getSessionSnapshots(sessionId);
      const dialoguePractice = await dialoguePracticeService.getSessionPractice(sessionId);

      let dialogue = null;
      if (dialoguePractice) {
        const choices = await dialogueChoiceService.getPracticeChoices(dialoguePractice.id);

        dialogue = {
          id: dialoguePractice.dialogue_id,
          title: dialoguePractice.dialogue_title,
          connectionScore: dialoguePractice.connection_score,
          metrics: {
            Understanding: dialoguePractice.understanding_score,
            "Empathy signaled": dialoguePractice.empathy_signaled_score,
            "Clarity of next steps": dialoguePractice.clarity_score,
          },
          choices: choices.map((choice) => ({
            lineNumber: choice.line_number,
            speaker: choice.speaker,
            prompt: choice.prompt,
            selected: choice.selected_option,
            effect: {
              Understanding: choice.understanding_effect,
              "Empathy signaled": choice.empathy_effect,
              "Clarity of next steps": choice.clarity_effect,
            },
          })),
          completion: {
            completed: dialoguePractice.completed_lines,
            total: dialoguePractice.total_lines,
          },
        };
      }

      return {
        updatedAt: session.updated_at || session.created_at,
        user: {
          name: session.user_id, // You might want to join with user_profiles
          email: "", // You might want to join with auth.users
        },
        notes: session.notes || "",
        scenarioSnapshots: snapshots.map((snap) => ({
          id: snap.scenario_id,
          title: snap.scenario_title,
          empathyFocus: snap.empathy_focus || [],
          scores: {
            customer: snap.customer_score,
            manager: snap.manager_score,
          },
          average: snap.average_score,
        })),
        selectedScenarioId: session.selected_scenario_id,
        dialogue,
        learnings: session.learnings || [],
        improvementTips: session.improvement_tips || [],
      };
    } catch (error) {
      console.error("Error loading complete session:", error);
      throw error;
    }
  },
};
