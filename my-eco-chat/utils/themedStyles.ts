// utils/themedStyles.ts
import { StyleSheet } from 'react-native';
import { AccessibilitySettings } from '../contexts/AccessibilityContext';

export const createThemedStyles = (settings: AccessibilitySettings) => {
  const baseTextSize = settings.isLargeTextMode ? 1.2 : 1;
  const letterSpacing = (settings.isDyslexiaMode || settings.textSpacing === 'increased') ? 0.5 : 0;

  const colors = {
    primary: settings.isColorBlindMode ? '#0077BB' : '#22C55E',
    background: settings.isHighContrastMode ? '#000000' : '#f5f5f5',
    cardBackground: settings.isHighContrastMode ? '#1A1A1A' : '#FFFFFF',
    text: settings.isHighContrastMode ? '#FFFFFF' : '#1F2937',
    secondaryText: settings.isHighContrastMode ? '#E5E5E5' : '#6B7280',
    border: settings.isHighContrastMode ? '#FFFFFF' : '#E5E7EB',
  };

  return StyleSheet.create({
    // Base container
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    // Text styles
    text: {
      fontSize: 16 * baseTextSize,
      color: colors.text,
      fontFamily: settings.isDyslexiaMode ? 'OpenDyslexic' : undefined,
      letterSpacing,
      lineHeight: settings.isDyslexiaMode ? 24 * baseTextSize : 20 * baseTextSize,
    },
    
    // Card styles
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: settings.isHighContrastMode ? 1 : 0,
      borderColor: colors.border,
    },
    
    // Input styles
    input: {
      backgroundColor: settings.isHighContrastMode ? '#333333' : '#F3F4F6',
      color: colors.text,
      borderColor: colors.border,
      borderWidth: settings.isHighContrastMode ? 1 : 0,
      padding: 12,
      borderRadius: 8,
      fontSize: 16 * baseTextSize,
      fontFamily: settings.isDyslexiaMode ? 'OpenDyslexic' : undefined,
      letterSpacing,
    },
    
    // Button styles
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: settings.isHighContrastMode ? 2 : 0,
      borderColor: colors.border,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16 * baseTextSize,
      fontFamily: settings.isDyslexiaMode ? 'OpenDyslexic' : undefined,
      fontWeight: '600',
      letterSpacing,
    },
  });
};