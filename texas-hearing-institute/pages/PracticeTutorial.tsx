import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import CustomSafeAreaView from '../components/CustomSafeAreaView/CustomSafeAreaView';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import FloatingButton from '../components/FloatingButton';

export interface Props {
	handleClose: () => void;
}

export default function PracticeTutorial({ handleClose }: Props) {
	const [active, setActive] = useState(0);
	const ref = React.useRef<ICarouselInstance>(null);

	const images = [
		require('../assets/tutorial-swipe-right.png'),
		require('../assets/tutorial-swipe-left.png'),
	];

	const captions = ['Swipe right to mark ', 'Swipe left to mark '];

	const captionsBold = ['Correct', 'Still Learning'];
	return (
		<CustomSafeAreaView>
			<View
				style={{
					marginHorizontal: 32,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<View style={{ marginTop: 80 }}>
					<Carousel
						loop
						ref={ref}
						width={282}
						height={390}
						data={images}
						scrollAnimationDuration={1000}
						onSnapToItem={(i) => setActive(i)}
						renderItem={({ index }) => (
							<View style={{ alignItems: 'center', rowGap: 14 }}>
								<Image
									source={images[index]}
									style={{ width: 282, height: 326 }}
								/>
								<View style={{ flexDirection: 'row' }}>
									<Text>{captions[index]}</Text>
									<Text style={{ fontWeight: 'bold' }}>
										{captionsBold[index]}
									</Text>
								</View>
							</View>
						)}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							columnGap: 12,
						}}
					>
						{Array.from(images).map((_, index) => (
							<Pressable
								onPress={() => index !== active && ref.current?.next()}
							>
								<View
									key={`pagination-${index}`}
									style={{
										borderRadius: 25,
										backgroundColor: index === active ? '#AFE4F9' : '#E6E6E6',
										width: 12,
										height: 12,
									}}
								/>
							</Pressable>
						))}
					</View>
					<View style={{ marginTop: 160 }}>
						<FloatingButton label={"Let's Practice"} onPress={handleClose} />
					</View>
				</View>
			</View>
		</CustomSafeAreaView>
	);
}
