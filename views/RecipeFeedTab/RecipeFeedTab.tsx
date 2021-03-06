import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LogoutButton } from "../../components";
import {
  RecipeDetails,
  RecipeDetailsProps,
} from "../RecipeDetails/RecipeDetails";
import { RecipeFeed } from "../RecipeFeed/RecipeFeed";

export interface RecipeFeedTabProps {
  Firestore: boolean;
}

export enum RecipeFeedScreens {
  Feed = "Feed",
  Details = "Details",
}

export type RecipeFeedStackViews = {
  Feed: RecipeFeedTabProps;
  Details: RecipeDetailsProps;
};

export const RecipeFeedTab: React.FC<RecipeFeedTabProps> = ({ Firestore }) => {
  const Stack = createStackNavigator<RecipeFeedStackViews>();

  return (
    <Stack.Navigator>
      {Firestore ? (
        <>
          <Stack.Screen
            name="Feed"
            options={{
              headerTitle: "Saved",
              headerRight: () => <LogoutButton />,
            }}
          >
            {() => <RecipeFeed Firestore={Firestore} />}
          </Stack.Screen>
          <Stack.Screen name="Details">
            {(props) => (
              <RecipeDetails
                id={props.route.params.id}
                navigation={props.navigation}
                Firestore={Firestore}
              />
            )}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Feed"
            options={{ headerRight: () => <LogoutButton /> }}
          >
            {() => <RecipeFeed Firestore={Firestore} />}
          </Stack.Screen>
          <Stack.Screen name="Details">
            {(props) => (
              <RecipeDetails
                id={props.route.params.id}
                navigation={props.navigation}
                Firestore={Firestore}
              />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
