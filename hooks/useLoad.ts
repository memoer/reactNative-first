import React, { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';

interface Status {
  loading: boolean;
  error: null | string;
}
interface UseLoadProps {
  images: (string | number)[];
  fonts: Record<string, any>[];
}

export default ({ images, fonts }: UseLoadProps): Status => {
  const [status, setStatus] = useState<Status>({ loading: false, error: null });
  const cacheImages = (images: UseLoadProps['images']) =>
    images.map((image) =>
      typeof image === 'string' ? Image.prefetch(image) : Asset.fromModule(image).downloadAsync()
    );
  const cacheFonts = (fonts: UseLoadProps['fonts']) => fonts.map((font) => Font.loadAsync(font));
  const loadAssets = async () => {
    return Promise.all<boolean | Asset | void>([...cacheImages(images), ...cacheFonts(fonts)]);
  };
  useEffect(() => {
    loadAssets()
      .then((res) => setStatus({ loading: true, error: null }))
      .catch((error) => setStatus({ loading: true, error }));
  }, []);
  return status;
};
