import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { HeaderSheet } from './HeaderSheet';
import { supabase } from '../../lib/supabase';

type Profile = {
  avatar_url: string | null;
};

export function Header() {
  const insets = useSafeAreaInsets();
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();

    // Subscribe to profile changes
    const channel = supabase
      .channel('public:profiles')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        (payload) => {
          if (
            payload.eventType === 'UPDATE' ||
            payload.eventType === 'INSERT'
          ) {
            fetchProfile();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Avatar */}
        <TouchableOpacity onPress={() => setIsSheetVisible(true)}>
          <Image
            source={{
              uri:
                profile?.avatar_url ||
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* Xconnect Text Logo */}
        <Text style={styles.logoText}>Xconnect</Text>
      </View>

      <HeaderSheet
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    backgroundColor: '#0d0d0c',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b0fb50',
    textAlign: 'center',
    flex: 1, // Makes the text take available space
  },
});
