import { useCallback, useEffect } from "react";
import { useCharacterStore, type FaceFeatures } from "~/entities/character";
import { getFaceFeature, setFaceFeature as eventSetFaceFeature, renavigate } from "~/shared/lib/event-manager";
import { InputAxis } from "~/widgets/input-axis";
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
    [stateSetFaceFeatures],
  );

  return (
    <div className="character-creator-page">
      <InputAxis
        label="Ширина и высота носа"
        x={{
          label: "Ширина",
          value: face_features.nose_width,
          min: { label: "Уже", value: -1 },
          max: { label: "Шире", value: 1 },
        }}
        y={{
          label: "Высота",
          value: face_features.nose_peak,
          min: { label: "Ниже", value: -1 },
          max: { label: "Выше", value: 1 },
          reverse: true,
        }}
        onChange={(nose_width: number, nose_peak: number) => setFaceFeature({ nose_width, nose_peak })}
      />
      <InputAxis
        label="Искривление носа"
        x={{
          label: "Перегородка",
          value: face_features.nose_bone_twist,
          min: { label: "Левее", value: -1 },
          max: { label: "Правее", value: 1 },
        }}
        y={{
          label: "Горбинка",
          value: face_features.nose_bone_curveness,
          min: { label: "Глубже", value: -1 },
          max: { label: "Выше", value: 1 },
          reverse: true,
        }}
        onChange={(nose_bone_twist: number, nose_bone_curveness: number) =>
          setFaceFeature({ nose_bone_twist, nose_bone_curveness })
        }
      />
      <InputAxis
        label="Длина носа"
        x={{
          label: "Длина",
          value: face_features.nose_length,
          min: { label: "Короче", value: -1 },
          max: { label: "Длиннее", value: 1 },
          reverse: true,
        }}
        y={{
          label: "Кончик",
          value: face_features.nose_tip,
          min: { label: "Ниже", value: -1 },
          max: { label: "Выше", value: 1 },
          reverse: true,
        }}
        onChange={(nose_length: number, nose_tip: number) => setFaceFeature({ nose_length, nose_tip })}
      />
      <InputAxis
        label="Брови"
        x={{
          label: "Глубина",
          value: face_features.eyebrow_in_out,
          min: { label: "Глубже", value: -1 },
          max: { label: "Дальше", value: 1 },
        }}
        y={{
          label: "Высота",
          value: face_features.eyebrow_up_down,
          min: { label: "Ниже", value: -1 },
          max: { label: "Выше", value: 1 },
          reverse: true,
        }}
        onChange={(eyebrow_in_out: number, eyebrow_up_down: number) =>
          setFaceFeature({ eyebrow_in_out, eyebrow_up_down })
        }
      />
      <InputAxis
        label="Щеки"
        x={{
          label: "Ширина",
          value: face_features.cheek_sideways_bone_size,
          min: { label: "Уже", value: -1 },
          max: { label: "Шире", value: 1 },
        }}
        y={{
          label: "Глубина",
          value: face_features.cheek_bones_width,
          min: { label: "Худее", value: -1 },
          max: { label: "Толще", value: 1 },
          reverse: true,
        }}
        onChange={(cheek_sideways_bone_size: number, cheek_bones_width: number) =>
          setFaceFeature({ cheek_sideways_bone_size, cheek_bones_width })
        }
      />
      <InputRange
        tabIndex={1}
        label="Высота щек"
        value={face_features.cheek_bones}
        min={-1}
        max={1}
        step={0.001}
        onChange={(cheek_bones) => setFaceFeature({ cheek_bones })}
      />
      <InputRange
        tabIndex={2}
        label="Размер глаз"
        value={face_features.eye_opening}
        min={-1}
        max={1}
        step={0.001}
        onChange={(eye_opening) => setFaceFeature({ eye_opening })}
      />
      <InputRange
        tabIndex={3}
        label="Размер губ"
        value={face_features.lip_thickness}
        min={-1}
        max={1}
        step={0.001}
        onChange={(lip_thickness) => setFaceFeature({ lip_thickness })}
      />
      <InputAxis
        label="Челюсть"
        x={{
          label: "Ширина",
          value: face_features.jaw_bone_width,
          min: { label: "Уже", value: -1 },
          max: { label: "Шире", value: 1 },
        }}
        y={{
          label: "Форма",
          value: face_features.jaw_bone_shape,
          min: { label: "Ниже", value: -1 },
          max: { label: "Выше", value: 1 },
          reverse: true,
        }}
        onChange={(jaw_bone_width: number, jaw_bone_shape: number) =>
          setFaceFeature({ jaw_bone_width, jaw_bone_shape })
        }
      />
      <InputAxis
        label="Подбородок"
        x={{
          label: "Ширина",
          value: face_features.chin_bone_shape,
          min: { label: "Уже", value: -1 },
          max: { label: "Шире", value: 1 },
        }}
        y={{
          label: "Длина",
          value: face_features.chin_bone_length,
          min: { label: "Короче", value: -1 },
          max: { label: "Длиннее", value: 1 },
        }}
        onChange={(chin_bone_shape: number, chin_bone_length: number) =>
          setFaceFeature({ chin_bone_shape, chin_bone_length })
        }
      />
      <InputRange
        tabIndex={4}
        label="Высота подбородка"
        value={face_features.chin_bone}
        min={-1}
        max={1}
        step={0.001}
        onChange={(chin_bone) => setFaceFeature({ chin_bone })}
      />
      <InputRange
        tabIndex={5}
        label="Ямка подбородка"
        value={face_features.chin_hole}
        min={-1}
        max={1}
        step={0.001}
        onChange={(chin_hole) => setFaceFeature({ chin_hole })}
      />
      <InputRange
        tabIndex={6}
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
