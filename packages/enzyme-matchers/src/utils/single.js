/*
 * Copyright 2016 hudl
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule single
 * @flow
 *
 * This ensures a matcher can only be called with a single enzymeWrapper
 */

export default function single(
  matcherFn:Function,
) {
  return function singleWrapper(enzymeWrapper, ...args) {
    let message;
    switch (enzymeWrapper.nodes.length) {
      case 0:
        message = `${matcherFn.name} must be called on a single node, not an empty node.`;
      case 1:
        break;
      default:
        message = `${matcherFn.name} must be called on a single node, not multiple nodes.`;
    }

    if (message) {
      return {
        pass: false,
        message,
        negatedMessage: message,
        contextualInformation: {},
      };
    } else {
      return matcherFn(enzymeWrapper, ...args);
    }
  }
}
