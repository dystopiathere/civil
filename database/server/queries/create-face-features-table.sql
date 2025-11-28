CREATE TABLE IF NOT EXISTS face_features
(
    id                       BIGSERIAL PRIMARY KEY,
    nose_width               FLOAT                       NOT NULL DEFAULT 0.0,
    nose_peak                FLOAT                       NOT NULL DEFAULT 0.0,
    nose_length              FLOAT                       NOT NULL DEFAULT 0.0,
    nose_bone_curveness      FLOAT                       NOT NULL DEFAULT 0.0,
    nose_tip                 FLOAT                       NOT NULL DEFAULT 0.0,
    nose_bone_twist          FLOAT                       NOT NULL DEFAULT 0.0,
    eyebrow_up_down          FLOAT                       NOT NULL DEFAULT 0.0,
    eyebrow_in_out           FLOAT                       NOT NULL DEFAULT 0.0,
    cheek_bones              FLOAT                       NOT NULL DEFAULT 0.0,
    cheek_sideways_bone_size FLOAT                       NOT NULL DEFAULT 0.0,
    cheek_bones_width        FLOAT                       NOT NULL DEFAULT 0.0,
    eye_opening              FLOAT                       NOT NULL DEFAULT 0.0,
    lip_thickness            FLOAT                       NOT NULL DEFAULT 0.0,
    jaw_bone_width           FLOAT                       NOT NULL DEFAULT 0.0,
    jaw_bone_shape           FLOAT                       NOT NULL DEFAULT 0.0,
    chin_bone                FLOAT                       NOT NULL DEFAULT 0.0,
    chin_bone_length         FLOAT                       NOT NULL DEFAULT 0.0,
    chin_bone_shape          FLOAT                       NOT NULL DEFAULT 0.0,
    chin_hole                FLOAT                       NOT NULL DEFAULT 0.0,
    neck_thickness           FLOAT                       NOT NULL DEFAULT 0.0,
    created_at               TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO face_features DEFAULT
VALUES;