import { useCallback, useEffect } from "react";
import { useCharacterStore, type FaceFeatures } from "~/entities/character";
import { getFaceFeature, setFaceFeature as eventSetFaceFeature, renavigate } from "~/shared/lib/event-manager";
import { InputRange } from "~/widgets/input-range";

export function CharacterCreatorFace() {
  const { face_features, setFaceFeatures: stateSetFaceFeatures } = useCharacterStore();

  useEffect(() => {
    renavigate({ page: "characterCreatorFace" });

    getFaceFeature().then((data) => {
      if (!data) {
        return;
      }

      const [faceFeatures, error] = data;

      if (error) {
        console.error(error);
        return;
      }

      if (faceFeatures) {
        stateSetFaceFeatures(faceFeatures);
      }
    });
  }, [stateSetFaceFeatures]);

  const setFaceFeature = useCallback(
    (data: Partial<FaceFeatures>) => {
      stateSetFaceFeatures(data);
      eventSetFaceFeature(data);
    },
    [stateSetFaceFeatures]
  );

  return (
    <div className="character-creator-page">
      <InputRange
        label="Ширина носа"
        value={face_features.nose_width}
        min={-1}
        max={1}
        step={0.001}
        onChange={(nose_width) => setFaceFeature({ nose_width })}
      />
      <InputRange
        label="Высота носа"
        value={face_features.nose_peak}
        min={-1}
        max={1}
        step={0.001}
        onChange={(nose_peak) => setFaceFeature({ nose_peak })}
      />
      <InputRange
        label="Длина носа"
        value={face_features.nose_length}
        min={-1}
        max={1}
        step={0.001}
        onChange={(nose_length) => setFaceFeature({ nose_length })}
      />
      <InputRange
        label="Горбинка носа"
        value={face_features.nose_bone_curveness}
        min={-1}
        max={1}
        step={0.001}
        onChange={(nose_bone_curveness) => setFaceFeature({ nose_bone_curveness })}
      />
      <InputRange
        label="Кончик носа"
        value={face_features.nose_tip}
        min={-1}
        max={1}
        step={0.001}
        onChange={(nose_tip) => setFaceFeature({ nose_tip })}
      />
      <InputRange
        label="Искривление перегородки"
        value={face_features.nose_bone_twist}
        min={-1}
        max={1}
        step={0.001}
        onChange={(nose_bone_twist) => setFaceFeature({ nose_bone_twist })}
      />
      <InputRange
        label="Высота бровей"
        value={face_features.eyebrow_up_down}
        min={-1}
        max={1}
        step={0.001}
        onChange={(eyebrow_up_down) => setFaceFeature({ eyebrow_up_down })}
      />
      <InputRange
        label="Глубина бровей"
        value={face_features.eyebrow_in_out}
        min={-1}
        max={1}
        step={0.001}
        onChange={(eyebrow_in_out) => setFaceFeature({ eyebrow_in_out })}
      />
      <InputRange
        label="Высота щек"
        value={face_features.cheek_bones}
        min={-1}
        max={1}
        step={0.001}
        onChange={(cheek_bones) => setFaceFeature({ cheek_bones })}
      />
      <InputRange
        label="Ширина щек"
        value={face_features.cheek_sideways_bone_size}
        min={-1}
        max={1}
        step={0.001}
        onChange={(cheek_sideways_bone_size) => setFaceFeature({ cheek_sideways_bone_size })}
      />
      <InputRange
        label="Глубина щек"
        value={face_features.cheek_bones_width}
        min={-1}
        max={1}
        step={0.001}
        onChange={(cheek_bones_width) => setFaceFeature({ cheek_bones_width })}
      />
      <InputRange
        label="Размер глаз"
        value={face_features.eye_opening}
        min={-1}
        max={1}
        step={0.001}
        onChange={(eye_opening) => setFaceFeature({ eye_opening })}
      />
      <InputRange
        label="Размер губ"
        value={face_features.lip_thickness}
        min={-1}
        max={1}
        step={0.001}
        onChange={(lip_thickness) => setFaceFeature({ lip_thickness })}
      />
      <InputRange
        label="Ширина челюсти"
        value={face_features.jaw_bone_width}
        min={-1}
        max={1}
        step={0.001}
        onChange={(jaw_bone_width) => setFaceFeature({ jaw_bone_width })}
      />
      <InputRange
        label="Форма челюсти"
        value={face_features.jaw_bone_shape}
        min={-1}
        max={1}
        step={0.001}
        onChange={(jaw_bone_shape) => setFaceFeature({ jaw_bone_shape })}
      />
      <InputRange
        label="Высота подбородка"
        value={face_features.chin_bone}
        min={-1}
        max={1}
        step={0.001}
        onChange={(chin_bone) => setFaceFeature({ chin_bone })}
      />
      <InputRange
        label="Длина подбородка"
        value={face_features.chin_bone_length}
        min={-1}
        max={1}
        step={0.001}
        onChange={(chin_bone_length) => setFaceFeature({ chin_bone_length })}
      />
      <InputRange
        label="Ширина подбородка"
        value={face_features.chin_bone_shape}
        min={-1}
        max={1}
        step={0.001}
        onChange={(chin_bone_shape) => setFaceFeature({ chin_bone_shape })}
      />
      <InputRange
        label="Ямка подбородка"
        value={face_features.chin_hole}
        min={-1}
        max={1}
        step={0.001}
        onChange={(chin_hole) => setFaceFeature({ chin_hole })}
      />
      <InputRange
        label="Ширина шеи"
        value={face_features.neck_thickness}
        min={-1}
        max={1}
        step={0.001}
        onChange={(neck_thickness) => setFaceFeature({ neck_thickness })}
      />
    </div>
  );
}
