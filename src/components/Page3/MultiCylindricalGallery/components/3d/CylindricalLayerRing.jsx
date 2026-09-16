import React from 'react';
import { CurvedCardMesh } from './CurvedCardMesh';

export const CylindricalLayerRing = React.memo(function CylindricalLayerRing({
  layer,
  onSelectCard
}) {
  const cardCount = layer.cards.length;
  const angleStep = (Math.PI * 2) / cardCount;
  const radius = layer.baseRadius;

  return (
    <group>
      {layer.cards.map((card, index) => {
        const cardAngle = index * angleStep;

        return (
          <CurvedCardMesh
            key={card.id}
            card={card}
            angle={cardAngle}
            radius={radius}
            layerY={0}
            layerFocus={1.0}
            scrollVelocity={0}
            layerOpacity={1.0}
            onSelectCard={onSelectCard}
            layerIndex={layer.id}
            cardWidth={3.2}
            cardHeight={2.0}
          />
        );
      })}
    </group>
  );
});

export default CylindricalLayerRing;
