// // app/(tabs)/insights.tsx
// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import {
//   BarChart,
//   LineChart,
//   PieChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Pie,
//   Cell,
//   Line,
//   Bar,
// } from 'recharts';

// const screenWidth = Dimensions.get('window').width;

// // Sample data
// const weeklyTransportData = [
//   { name: 'Walking', value: 45, color: '#22C55E' },
//   { name: 'Public Transit', value: 30, color: '#3B82F6' },
//   { name: 'Car', value: 25, color: '#EF4444' },
// ];

// const monthlyEmissionsData = [
//   { month: 'Jan', emissions: 180, target: 150 },
//   { month: 'Feb', emissions: 165, target: 150 },
//   { month: 'Mar', emissions: 158, target: 150 },
//   { month: 'Apr', emissions: 152, target: 150 },
//   { month: 'May', emissions: 145, target: 150 },
//   { month: 'Jun', emissions: 142, target: 150 },
//   { month: 'Jul', emissions: 148, target: 150 },
//   { month: 'Aug', emissions: 138, target: 150 },
//   { month: 'Sep', emissions: 135, target: 150 },
// ];

// const reusableItemsData = [
//   { day: 'Mon', bottles: 2, bags: 3, containers: 1 },
//   { day: 'Tue', bottles: 1, bags: 2, containers: 0 },
//   { day: 'Wed', bottles: 2, bags: 4, containers: 2 },
//   { day: 'Thu', bottles: 1, bags: 1, containers: 1 },
//   { day: 'Fri', bottles: 2, bags: 3, containers: 2 },
//   { day: 'Sat', bottles: 3, bags: 5, containers: 3 },
//   { day: 'Sun', bottles: 1, bags: 2, containers: 1 },
// ];

// const carbonSavingsData = [
//   { week: 'W1', kgSaved: 12.5 },
//   { week: 'W2', kgSaved: 15.2 },
//   { week: 'W3', kgSaved: 11.8 },
//   { week: 'W4', kgSaved: 16.4 },
// ];

// const DataSourceBadge = ({ source, isConnected }) => (
//   <View style={[
//     styles.sourceBadge,
//     !isConnected && styles.sourceBadgeDisconnected
//   ]}>
//     <Ionicons 
//       name={source.icon} 
//       size={12} 
//       color={isConnected ? '#22C55E' : '#9CA3AF'} 
//     />
//     <Text style={[
//       styles.sourceText,
//       !isConnected && styles.sourceTextDisconnected
//     ]}>
//       {source.name}
//     </Text>
//     {!isConnected && (
//       <TouchableOpacity style={styles.connectButton}>
//         <Text style={styles.connectButtonText}>Connect</Text>
//       </TouchableOpacity>
//     )}
//   </View>
// );

// export default function Insights() {
//   const chartConfig = {
//     width: screenWidth - 48,
//     height: 300,
//     margin: { top: 20, right: 30, left: 20, bottom: 30 },
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ gap: 24 }}>
//       {/* Weekly Transport Split */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               This Week's Transportation Choices
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               Based on your logged trips
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Google Maps', icon: 'map-outline' }}
//               isConnected={true}
//             />
//             <DataSourceBadge 
//               source={{ name: 'Apple Health', icon: 'fitness-outline' }}
//               isConnected={true}
//             />
//           </View>
//         </View>
//         <PieChart width={chartConfig.width} height={chartConfig.height}>
//           <Pie
//             data={weeklyTransportData}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//             paddingAngle={5}
//             dataKey="value"
//             label={({ name, value }) => `${name} (${value}%)`}
//           >
//             {weeklyTransportData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Legend />
//         </PieChart>
//         <Text style={styles.insight}>
//           🌟 75% of your trips this week were sustainable!
//         </Text>
//       </View>

//       {/* Monthly Emissions Trend */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               Monthly Carbon Footprint
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               Your progress towards sustainability target
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Wallet', icon: 'wallet-outline' }}
//               isConnected={true}
//             />
//             <DataSourceBadge 
//               source={{ name: 'Utility', icon: 'flash-outline' }}
//               isConnected={false}
//             />
//           </View>
//         </View>
//         <LineChart
//           width={chartConfig.width}
//           height={chartConfig.height}
//           data={monthlyEmissionsData}
//           margin={chartConfig.margin}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="emissions"
//             stroke="#EF4444"
//             strokeWidth={2}
//             name="Your Footprint"
//           />
//           <Line
//             type="monotone"
//             dataKey="target"
//             stroke="#22C55E"
//             strokeDasharray="5 5"
//             name="Target"
//           />
//         </LineChart>
//         <Text style={styles.insight}>
//           📉 Now 10% below your target! Keep it up!
//         </Text>
//       </View>

//       {/* Reusable Items Usage */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               Reusable Items Used This Week
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               Tracking your waste reduction
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Wallet', icon: 'wallet-outline' }}
//               isConnected={true}
//             />
//           </View>
//         </View>
//         <BarChart
//           width={chartConfig.width}
//           height={chartConfig.height}
//           data={reusableItemsData}
//           margin={chartConfig.margin}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="bottles" name="Water Bottles" fill="#22C55E" stackId="a" />
//           <Bar dataKey="bags" name="Shopping Bags" fill="#3B82F6" stackId="a" />
//           <Bar dataKey="containers" name="Food Containers" fill="#F97316" stackId="a" />
//         </BarChart>
//         <Text style={styles.insight}>
//           ♻️ You've prevented 42 single-use items this week!
//         </Text>
//       </View>

//       {/* Carbon Savings */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               Carbon Savings This Month
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               From sustainable transport choices
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Google Maps', icon: 'map-outline' }}
//               isConnected={true}
//             />
//             <DataSourceBadge 
//               source={{ name: 'Transit Card', icon: 'train-outline' }}
//               isConnected={false}
//             />
//           </View>
//         </View>
//         <BarChart
//           width={chartConfig.width}
//           height={250}
//           data={carbonSavingsData}
//           margin={chartConfig.margin}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="week" />
//           <YAxis />
//           <Tooltip />
//           <Bar
//             dataKey="kgSaved"
//             fill="#22C55E"
//             radius={[4, 4, 0, 0]}
//             name="kg CO₂ Saved"
//           />
//         </BarChart>
//         <Text style={styles.insight}>
//           🌍 Total CO₂ saved: 55.9 kg this month
//         </Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'column',
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   sourceContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginTop: 8,
//   },
//   sourceBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0FDF4',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     gap: 4,
//   },
//   sourceBadgeDisconnected: {
//     backgroundColor: '#F3F4F6',
//   },
//   sourceText: {
//     fontSize: 12,
//     color: '#22C55E',
//     fontWeight: '500',
//   },
//   sourceTextDisconnected: {
//     color: '#9CA3AF',
//   },
//   connectButton: {
//     backgroundColor: '#22C55E',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//     marginLeft: 4,
//   },
//   connectButtonText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   insight: {
//     fontSize: 16,
//     color: '#059669',
//     marginTop: 12,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });



// ATTEMPT 2 

// app/(tabs)/insights.tsx
// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// // Sample data
// const weeklyTransportData = [
//   { name: 'Walking', value: 45, color: '#22C55E' },
//   { name: 'Public Transit', value: 30, color: '#3B82F6' },
//   { name: 'Car', value: 25, color: '#EF4444' },
// ];

// const monthlyEmissionsData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//   datasets: [
//     {
//       data: [180, 165, 158, 152, 145, 142, 148, 138, 135],
//       color: () => '#EF4444',
//       strokeWidth: 2
//     },
//     {
//       data: [150, 150, 150, 150, 150, 150, 150, 150, 150],
//       color: () => '#22C55E',
//       strokeWidth: 2
//     }
//   ],
//   legend: ['Your Footprint', 'Target']
// };

// const reusableItemsData = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       data: [6, 3, 8, 3, 7, 11, 4]
//     }
//   ]
// };

// const carbonSavingsData = {
//   labels: ['W1', 'W2', 'W3', 'W4'],
//   datasets: [
//     {
//       data: [12.5, 15.2, 11.8, 16.4]
//     }
//   ]
// };

// const DataSourceBadge = ({ source, isConnected }) => (
//   <View style={[
//     styles.sourceBadge,
//     !isConnected && styles.sourceBadgeDisconnected
//   ]}>
//     <Ionicons 
//       name={source.icon} 
//       size={12} 
//       color={isConnected ? '#22C55E' : '#9CA3AF'} 
//     />
//     <Text style={[
//       styles.sourceText,
//       !isConnected && styles.sourceTextDisconnected
//     ]}>
//       {source.name}
//     </Text>
//     {!isConnected && (
//       <TouchableOpacity style={styles.connectButton}>
//         <Text style={styles.connectButtonText}>Connect</Text>
//       </TouchableOpacity>
//     )}
//   </View>
// );

// const chartConfig = {
//   backgroundColor: '#ffffff',
//   backgroundGradientFrom: '#ffffff',
//   backgroundGradientTo: '#ffffff',
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   style: {
//     borderRadius: 16
//   },
//   propsForDots: {
//     r: '6',
//     strokeWidth: '2',
//     stroke: '#ffa726'
//   }
// };

// export default function Insights() {
//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ gap: 24 }}>
//       {/* Weekly Transport Split */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               This Week's Transportation Choices
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               Based on your logged trips
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Google Maps', icon: 'map-outline' }}
//               isConnected={true}
//             />
//             <DataSourceBadge 
//               source={{ name: 'Apple Health', icon: 'fitness-outline' }}
//               isConnected={true}
//             />
//           </View>
//         </View>
//         <PieChart
//           data={weeklyTransportData.map(data => ({
//             name: data.name,
//             population: data.value,
//             color: data.color,
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 12
//           }))}
//           width={screenWidth - 32}
//           height={220}
//           chartConfig={chartConfig}
//           accessor="population"
//           backgroundColor="transparent"
//           paddingLeft="0"
//           absolute
//         />
//         <Text style={styles.insight}>
//           🌟 75% of your trips this week were sustainable!
//         </Text>
//       </View>

//       {/* Monthly Emissions Trend */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               Monthly Carbon Footprint
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               Your progress towards sustainability target
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Wallet', icon: 'wallet-outline' }}
//               isConnected={true}
//             />
//             <DataSourceBadge 
//               source={{ name: 'Utility', icon: 'flash-outline' }}
//               isConnected={false}
//             />
//           </View>
//         </View>
//         <LineChart
//           data={monthlyEmissionsData}
//           width={screenWidth - 32}
//           height={220}
//           chartConfig={{
//             ...chartConfig,
//             color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
//           }}
//           bezier
//         />
//         <Text style={styles.insight}>
//           📉 Now 10% below your target! Keep it up!
//         </Text>
//       </View>

//       {/* Reusable Items Usage */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               Reusable Items Used This Week
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               Tracking your waste reduction
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Wallet', icon: 'wallet-outline' }}
//               isConnected={true}
//             />
//           </View>
//         </View>
//         <BarChart
//           data={reusableItemsData}
//           width={screenWidth - 32}
//           height={220}
//           chartConfig={{
//             ...chartConfig,
//             color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
//           }}
//         />
//         <Text style={styles.insight}>
//           ♻️ You've prevented 42 single-use items this week!
//         </Text>
//       </View>

//       {/* Carbon Savings */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <View>
//             <Text style={styles.cardTitle}>
//               Carbon Savings This Month
//             </Text>
//             <Text style={styles.cardSubtitle}>
//               From sustainable transport choices
//             </Text>
//           </View>
//           <View style={styles.sourceContainer}>
//             <DataSourceBadge 
//               source={{ name: 'Google Maps', icon: 'map-outline' }}
//               isConnected={true}
//             />
//             <DataSourceBadge 
//               source={{ name: 'Transit Card', icon: 'train-outline' }}
//               isConnected={false}
//             />
//           </View>
//         </View>
//         <BarChart
//           data={carbonSavingsData}
//           width={screenWidth - 32}
//           height={220}
//           chartConfig={{
//             ...chartConfig,
//             color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
//           }}
//         />
//         <Text style={styles.insight}>
//           🌍 Total CO₂ saved: 55.9 kg this month
//         </Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'column',
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   sourceContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginTop: 8,
//   },
//   sourceBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0FDF4',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     gap: 4,
//   },
//   sourceBadgeDisconnected: {
//     backgroundColor: '#F3F4F6',
//   },
//   sourceText: {
//     fontSize: 12,
//     color: '#22C55E',
//     fontWeight: '500',
//   },
//   sourceTextDisconnected: {
//     color: '#9CA3AF',
//   },
//   connectButton: {
//     backgroundColor: '#22C55E',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//     marginLeft: 4,
//   },
//   connectButtonText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   insight: {
//     fontSize: 16,
//     color: '#059669',
//     marginTop: 12,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });

// app/(tabs)/insights.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 64;

// Sample data
const weeklyTransportData = [
  { name: 'Walking', value: 45, color: '#22C55E' },
  { name: 'Public Transit', value: 30, color: '#3B82F6' },
  { name: 'Car', value: 25, color: '#EF4444' },
];

const monthlyEmissionsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      data: [180, 165, 158, 152, 145, 142, 148, 138, 135],
      color: () => '#EF4444',
      strokeWidth: 2
    },
    {
      data: [150, 150, 150, 150, 150, 150, 150, 150, 150],
      color: () => '#22C55E',
      strokeWidth: 2
    }
  ],
  legend: ['Your Footprint', 'Target']
};

const reusableItemsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [6, 3, 8, 3, 7, 11, 4]
    }
  ]
};

const carbonSavingsData = {
  labels: ['W1', 'W2', 'W3', 'W4'],
  datasets: [
    {
      data: [12.5, 15.2, 11.8, 16.4]
    }
  ]
};

const DataSourceBadge = ({ source, isConnected }) => (
  <View style={[
    styles.sourceBadge,
    !isConnected && styles.sourceBadgeDisconnected
  ]}>
    <Ionicons 
      name={source.icon} 
      size={12} 
      color={isConnected ? '#22C55E' : '#9CA3AF'} 
    />
    <Text style={[
      styles.sourceText,
      !isConnected && styles.sourceTextDisconnected
    ]}>
      {source.name}
    </Text>
    {!isConnected && (
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    )}
  </View>
);

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  barPercentage: 0.8, // Makes bars thinner
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '1',
    stroke: '#ffa726'
  },
  decimalPlaces: 0,
  yAxisInterval: 1,
  labelStyle: {
    fontSize: 10,
  },
  formatXLabel: (label) => label.substring(0, 3),
  formatYLabel: (label) => Math.round(label),
};

const barChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
    barPercentage: 0.8, // Makes bars thinner
    propsForLabels: {
      fontSize: 10,
    },
    horizontalLabelRotation: -45, // Rotates labels to prevent overflow
  };

export default function Insights() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 24 }}>
      {/* Weekly Transport Split */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              This Week's Transportation Choices
            </Text>
            <Text style={styles.cardSubtitle}>
              Based on your logged trips
            </Text>
          </View>
          <View style={styles.sourceContainer}>
            <DataSourceBadge 
              source={{ name: 'Google Maps', icon: 'map-outline' }}
              isConnected={true}
            />
            <DataSourceBadge 
              source={{ name: 'Apple Health', icon: 'fitness-outline' }}
              isConnected={true}
            />
          </View>
        </View>
        <View style={styles.chartWrapper}>
          <PieChart
            data={weeklyTransportData.map(data => ({
              name: data.name,
              population: data.value,
              color: data.color,
              legendFontColor: '#7F7F7F',
              legendFontSize: 10
            }))}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[0, 0]}
            absolute
          />
        </View>
        <Text style={styles.insight}>
          🌟 75% of your trips this week were sustainable!
        </Text>
      </View>

      {/* Monthly Emissions Trend */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              Monthly Carbon Footprint
            </Text>
            <Text style={styles.cardSubtitle}>
              Your progress towards sustainability target
            </Text>
          </View>
          <View style={styles.sourceContainer}>
            <DataSourceBadge 
              source={{ name: 'Wallet', icon: 'wallet-outline' }}
              isConnected={true}
            />
            <DataSourceBadge 
              source={{ name: 'Utility', icon: 'flash-outline' }}
              isConnected={false}
            />
          </View>
        </View>
        <View style={styles.chartWrapper}>
          <LineChart
            data={monthlyEmissionsData}
            width={chartWidth}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            withInnerLines={false}
            withOuterLines={true}
          />
        </View>
        <Text style={styles.insight}>
          📉 Now 10% below your target! Keep it up!
        </Text>
      </View>

      {/* Reusable Items Usage */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              Reusable Items Used This Week
            </Text>
            <Text style={styles.cardSubtitle}>
              Tracking your waste reduction
            </Text>
          </View>
          <View style={styles.sourceContainer}>
            <DataSourceBadge 
              source={{ name: 'Wallet', icon: 'wallet-outline' }}
              isConnected={true}
            />
          </View>
        </View>
        <View style={styles.chartWrapper}>
          {/* <BarChart
            data={reusableItemsData}
            width={chartWidth}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            showBarTops={false}
            withInnerLines={false}
          /> */}
          <BarChart
            data={reusableItemsData}
            width={chartWidth}
            height={220}
            chartConfig={barChartConfig}
            style={{
                marginVertical: 8,
                marginLeft: -32,
                borderRadius: 16,
            }}
            showBarTops={false}
            withInnerLines={false}
            yAxisLabel=""
            fromZero={true}
            withHorizontalLabels={true}
            segments={4}
            />
        </View>
        <Text style={styles.insight}>
          ♻️ You've prevented 42 single-use items this week!
        </Text>
      </View>

      {/* Carbon Savings */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              Carbon Savings This Month (By Week)
            </Text>
            <Text style={styles.cardSubtitle}>
              From sustainable transport choices
            </Text>
          </View>
          <View style={styles.sourceContainer}>
            <DataSourceBadge 
              source={{ name: 'Google Maps', icon: 'map-outline' }}
              isConnected={true}
            />
            <DataSourceBadge 
              source={{ name: 'Transit Card', icon: 'train-outline' }}
              isConnected={false}
            />
          </View>
        </View>
        <View style={styles.chartWrapper}>
          <BarChart
            data={carbonSavingsData}
            width={chartWidth}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            showBarTops={false}
            withInnerLines={false}
          />
        </View>
        <Text style={styles.insight}>
          🌍 Total CO₂ saved: 55.9 kg this month
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  chartWrapper: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  sourceBadgeDisconnected: {
    backgroundColor: '#F3F4F6',
  },
  sourceText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '500',
  },
  sourceTextDisconnected: {
    color: '#9CA3AF',
  },
  connectButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  insight: {
    fontSize: 16,
    color: '#059669',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

