/**
 * simple-pid-controller/index.js  
 * Copyright 2025 Tomel218 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * PID Controller with anti-windup.
 */
class PIDController {
  /**
   * Create a new PID Controller.
   *
   * @param {number} [k_p=1.0]    - Proportional gain.
   * @param {number} [k_i=0.0]    - Integral gain.
   * @param {number} [k_d=0.0]    - Derivative gain.
   * @param {number} [i_max=Infinity] - Max integral contribution (positive or Infinity).
   * @param {number} [i_min=-Infinity] - Min integral contribution (negative or -Infinity).
   * @param {number} [dt=1.0]     - Time step between updates.
   */
  constructor(k_p = 1.0, k_i = 0.0, k_d = 0.0, i_max = Infinity, i_min = -Infinity, dt = 1.0) {
    if (
      [k_p, k_i, k_d, i_max, i_min, dt].some(v => typeof v !== 'number')
    ) {
      throw new Error("All PID constructor parameters must be numbers.");
    }

    if (i_max <= 0 && i_max !== Infinity) {
      throw new Error("i_max must be a positive number or Infinity.");
    }

    if (i_min >= 0 && i_min !== -Infinity) {
      throw new Error("i_min must be a negative number or -Infinity.");
    }

    this.k_p = k_p;
    this.k_i = k_i;
    this.k_d = k_d;
    this.dt = dt;

    this.i_max = i_max;
    this.i_min = i_min;

    this.target       = 0;
    this.currentValue = 0;
    this.sumError     = 0;
    this.lastError    = 0;

    this.defineGetters();
  }

  /**
   * Define P, I, and D component getters.
   */
  defineGetters() {
    Object.defineProperty(this, 'p', {
      get: () => this.k_p * (this.target - this.currentValue)
    });

    Object.defineProperty(this, 'i', {
      get: () => {
        const iTerm = this.k_i * this.sumError;
        if (iTerm > this.i_max) return this.i_max;
        if (iTerm < this.i_min) return this.i_min;
        return iTerm;
      }
    });

    Object.defineProperty(this, 'd', {
      get: () => this.k_d * (this.target - this.lastError) / this.dt
    });
  }

  /**
   * Set a new target value.
   *
   * @param {number} target - Desired setpoint.
   */
  setTarget(target) {
    if (typeof target !== 'number') {
      throw new Error("Target must be a number.");
    }
    this.target = target;
  }

  /**
   * Update the controller and return the control output.
   *
   * @param {number} currentValue - Current process value.
   * @returns {number} Control output.
   */
  update(currentValue) {
    if (typeof currentValue !== 'number') {
      throw new Error("Current value must be a number.");
    }

    this.currentValue = currentValue;
    const error = this.target - this.currentValue;

    this.sumError += error * this.dt;

    const maxSum = this.k_i !== 0 ? this.i_max / this.k_i : Infinity;
    const minSum = this.k_i !== 0 ? this.i_min / this.k_i : -Infinity;

    if (this.sumError > maxSum) {
      this.sumError = maxSum;
    } else if (this.sumError < minSum) {
      this.sumError = minSum;
    }

    const output = this.p + this.i + this.d;

    this.lastError = error;
    return output;
  }
}

module.exports = PIDController;
