import { useCallback, useEffect } from "react";
import type { FaceFeaturesEntity } from "@civil/types";
import { useCharacterStore } from "~/entities";
import { getFaceFeature, setFaceFeature as eventSetFaceFeature, renavigate } from "~/shared/lib";
import { InputAxis, InputRange } from "~/widgets";

export function CharacterCreatorFace() {
  const { faceFeatures, setFaceFeatures: stateSetFaceFeatures } = useCharacterStore();

  useEffect(() => {
    renavigate({ page: "characterCreatorFace" });

    getFaceFeature().then((data) => {
      if (!data) {
        return;
      }

      const [result, error] = data;

      if (error) {
        console.error(error);
        return;
      }

      if (result) {
        stateSetFaceFeatures(result);
      }
    });
  }, [stateSetFaceFeatures]);

  const setFaceFeature = useCallback(
    (data: Partial<FaceFeaturesEntity>) => {
      stateSetFaceFeatures(data);
      eventSetFaceFeature(data);
    },
    [stateSetFaceFeatures],
  );

  return (
    faceFeatures && (
      <div className="character-creator-page">
        <InputAxis
          label="Ширина и высота носа"
          x={{
            label: "Ширина",
            value: faceFeatures.noseWidth,
            min: { label: "Уже", value: -1 },
            max: { label: "Шире", value: 1 },
          }}
          y={{
            label: "Высота",
            value: faceFeatures.nosePeak,
            min: { label: "Ниже", value: -1 },
            max: { label: "Выше", value: 1 },
            reverse: true,
          }}
          onChange={(noseWidth: number, nosePeak: number) => setFaceFeature({ noseWidth, nosePeak })}
        />
        <InputAxis
          label="Искривление носа"
          x={{
            label: "Перегородка",
            value: faceFeatures.noseBoneTwist,
            min: { label: "Левее", value: -1 },
            max: { label: "Правее", value: 1 },
          }}
          y={{
            label: "Горбинка",
            value: faceFeatures.noseBoneCurveness,
            min: { label: "Глубже", value: -1 },
            max: { label: "Выше", value: 1 },
            reverse: true,
          }}
          onChange={(noseBoneTwist: number, noseBoneCurveness: number) =>
            setFaceFeature({ noseBoneTwist, noseBoneCurveness })
          }
        />
        <InputAxis
          label="Длина носа"
          x={{
            label: "Длина",
            value: faceFeatures.noseLength,
            min: { label: "Короче", value: -1 },
            max: { label: "Длиннее", value: 1 },
            reverse: true,
          }}
          y={{
            label: "Кончик",
            value: faceFeatures.noseTip,
            min: { label: "Ниже", value: -1 },
            max: { label: "Выше", value: 1 },
            reverse: true,
          }}
          onChange={(noseLength: number, noseTip: number) => setFaceFeature({ noseLength, noseTip })}
        />
        <InputAxis
          label="Брови"
          x={{
            label: "Глубина",
            value: faceFeatures.eyebrowInOut,
            min: { label: "Глубже", value: -1 },
            max: { label: "Дальше", value: 1 },
          }}
          y={{
            label: "Высота",
            value: faceFeatures.eyebrowUpDown,
            min: { label: "Ниже", value: -1 },
            max: { label: "Выше", value: 1 },
            reverse: true,
          }}
          onChange={(eyebrowInOut: number, eyebrowUpDown: number) => setFaceFeature({ eyebrowInOut, eyebrowUpDown })}
        />
        <InputAxis
          label="Щеки"
          x={{
            label: "Ширина",
            value: faceFeatures.cheekSidewaysBoneSize,
            min: { label: "Уже", value: -1 },
            max: { label: "Шире", value: 1 },
          }}
          y={{
            label: "Глубина",
            value: faceFeatures.cheekBonesWidth,
            min: { label: "Худее", value: -1 },
            max: { label: "Толще", value: 1 },
            reverse: true,
          }}
          onChange={(cheekSidewaysBoneSize: number, cheekBonesWidth: number) =>
            setFaceFeature({ cheekSidewaysBoneSize, cheekBonesWidth })
          }
        />
        <InputRange
          tabIndex={1}
          label="Высота щек"
          value={faceFeatures.cheekBones}
          min={-1}
          max={1}
          step={0.001}
          onChange={(cheekBones) => setFaceFeature({ cheekBones })}
        />
        <InputRange
          tabIndex={2}
          label="Размер глаз"
          value={faceFeatures.eyeOpening}
          min={-1}
          max={1}
          step={0.001}
          onChange={(eyeOpening) => setFaceFeature({ eyeOpening })}
        />
        <InputRange
          tabIndex={3}
          label="Размер губ"
          value={faceFeatures.lipThickness}
          min={-1}
          max={1}
          step={0.001}
          onChange={(lipThickness) => setFaceFeature({ lipThickness })}
        />
        <InputAxis
          label="Челюсть"
          x={{
            label: "Ширина",
            value: faceFeatures.jawBoneWidth,
            min: { label: "Уже", value: -1 },
            max: { label: "Шире", value: 1 },
          }}
          y={{
            label: "Форма",
            value: faceFeatures.jawBoneShape,
            min: { label: "Ниже", value: -1 },
            max: { label: "Выше", value: 1 },
            reverse: true,
          }}
          onChange={(jawBoneWidth: number, jawBoneShape: number) => setFaceFeature({ jawBoneWidth, jawBoneShape })}
        />
        <InputAxis
          label="Подбородок"
          x={{
            label: "Ширина",
            value: faceFeatures.chinBoneShape,
            min: { label: "Уже", value: -1 },
            max: { label: "Шире", value: 1 },
          }}
          y={{
            label: "Длина",
            value: faceFeatures.chinBoneLength,
            min: { label: "Короче", value: -1 },
            max: { label: "Длиннее", value: 1 },
          }}
          onChange={(chinBoneShape: number, chinBoneLength: number) =>
            setFaceFeature({ chinBoneShape, chinBoneLength })
          }
        />
        <InputRange
          tabIndex={4}
          label="Высота подбородка"
          value={faceFeatures.chinBone}
          min={-1}
          max={1}
          step={0.001}
          onChange={(chinBone) => setFaceFeature({ chinBone })}
        />
        <InputRange
          tabIndex={5}
          label="Ямка подбородка"
          value={faceFeatures.chinHole}
          min={-1}
          max={1}
          step={0.001}
          onChange={(chinHole) => setFaceFeature({ chinHole })}
        />
        <InputRange
          tabIndex={6}
          label="Ширина шеи"
          value={faceFeatures.neckThickness}
          min={-1}
          max={1}
          step={0.001}
          onChange={(neckThickness) => setFaceFeature({ neckThickness })}
        />
      </div>
    )
  );
}
