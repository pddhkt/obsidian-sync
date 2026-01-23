-- TTS and AutoTNC Permissions
-- Generated: 2026-01-13

INSERT INTO "public"."ctint_permissions" ("code", "name", "type", "channel", "tenant", "platform", "state", "createTime", "updateTime", "createBy", "updateBy") VALUES
-- TTS Permissions
('ctint-mf-tts.application.visit', 'Visit TTS Application', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-tts.voice-prompts.view', 'View Voice Prompts', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-tts.voice-prompts.edit', 'Edit Voice Prompts', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-tts.voice-prompts.publish', 'Publish Voice Prompts', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-tts.special-words-user.view', 'View User Replacements', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-tts.special-words-user.edit', 'Edit User Replacements', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-tts.special-words-system.view', 'View System Replacements', 'tts', 'ctint-mf-tts', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
-- AutoTNC Permissions
('ctint-mf-autotnc.application.visit', 'Visit AutoTNC Application', 'autotnc', 'ctint-mf-autotnc', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-autotnc.previous-records.scope-my', 'View My Previous Records', 'autotnc', 'ctint-mf-autotnc', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-autotnc.previous-records.scope-unit', 'View Unit Previous Records', 'autotnc', 'ctint-mf-autotnc', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL),
('ctint-mf-autotnc.previous-records.scope-all', 'View All Previous Records', 'autotnc', 'ctint-mf-autotnc', 'shacom', 'cdss', 'active', NOW(), NULL, NULL, NULL);
